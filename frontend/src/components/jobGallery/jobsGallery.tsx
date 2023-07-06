import React, {useEffect, useState} from 'react';
import useJobs from './useJob';
import JobsEntry from './jobsEntry';
import JobCard from './jobCard';
import {Jobs} from './model/jobs';
import './jobsGallery.css';
import axios from 'axios';
import useCalendarEvent from "../crewCalendar/useCalendar";


function JobsGallery() {
    const [jobs, fetchJobs, acceptJob, rejectJob] = useJobs();
    const [userId, setUserId] = useState('');
    const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
    const [showGallery, setShowGallery] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState('')
    const [selectedJobStatus, setSelectedJobStatus] = useState<string | undefined>(undefined);
    const [calendarEvent, fetchCalendarEvent, saveCalendarEvent] = useCalendarEvent(userId);


    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchUserId();
    }, []);
    useEffect(() => {
    }, [selectedJobStatus]);

    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/user/me');
            const userId = response.data.id;
            setUserId(userId);
        } catch (error) {
            console.error('Error fetching userId: ', error);
        }
    };

    const handleJobClick = (job: Jobs) => {
        setSelectedJob(job);
        setSelectedJobId(job.uuid);
        setSelectedJobStatus(job.userStatus)
        setShowGallery(false);
        console.log(job.uuid);
    };

    const handleShowGallery = () => {
        setShowGallery(true);
    };

    const handleAcceptJob = (jobId: string) => {
        acceptJob(jobId, userId);
        setShowGallery(true);
        setSelectedJobStatus('accepted');
    };

    const handleRejectJob = (jobId: string) => {
        rejectJob(jobId, userId);
        setShowGallery(true);
        setSelectedJobStatus('rejected');
    };

    return (
        <div>
            {showGallery ? (
                <div className="jobGallery">
                    <h1 className='header'> Aufträge</h1>
                    {jobs.map((currentJob: Jobs) => (
                        <div key={currentJob.uuid} onClick={() => handleJobClick(currentJob)}>
                            <JobsEntry
                                userId={userId}
                                job={currentJob}
                                selectedJobId={selectedJobId}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {selectedJob && (
                        <JobCard
                            job={selectedJob}
                            setSelectedJobStatus={setSelectedJobStatus}
                            onAccept={() => handleAcceptJob(selectedJob.uuid)}
                            onReject={() => handleRejectJob(selectedJob.uuid)}
                            saveCalendarEvent={saveCalendarEvent}

                        />
                    )}
                    <br/>
                    {/*<button onClick={handleShowGallery}>Zurück zur Galerie</button>*/}
                </div>
            )}
        </div>
    );
}

export default JobsGallery;
