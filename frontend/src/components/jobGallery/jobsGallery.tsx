import React, { useEffect, useState } from 'react';
import useJobs from './useJob';
import JobsEntry from './jobsEntry';
import JobCard from './jobCard';
import { Jobs } from './model/jobs';
import './jobsGallery.css';
import axios from 'axios';

function JobsGallery() {
    const [jobs, fetchJobs, acceptJob, rejectJob] = useJobs();
    const [userId, setUserId] = useState('');
    const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
    const [showGallery, setShowGallery] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState('')

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchUserId();
    }, []);
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
        setShowGallery(false);
    };

    const handleShowGallery = () => {
        setShowGallery(true);
    };

    const handleAcceptJob = (jobId: string) => {
        acceptJob(jobId);
        setShowGallery(true);
    };

    const handleRejectJob = (jobId: string) => {
        rejectJob(jobId);
        setShowGallery(true);
    };

    return (
        <div>
            {showGallery ? (
                <div className="jobGallery">
                    <header> Aufträge</header>
                    {jobs.map((currentJob: Jobs) => (
                        <div key={currentJob.uuid} onClick={() => handleJobClick(currentJob)}>
                            <JobsEntry
                                job={currentJob}
                                selectedJobId={selectedJobId}
                                selectedJobStatus={selectedJob?.status || ''}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {selectedJob && (
                        <JobCard
                            job={selectedJob}

                            onAccept={() => handleAcceptJob(selectedJob.uuid)}
                            onReject={() => handleRejectJob(selectedJob.uuid)}
                        />
                    )}
                    <br />
                    <button onClick={handleShowGallery}>Zurück zur Galerie</button>
                </div>
            )}
        </div>
    );
}

export default JobsGallery;
