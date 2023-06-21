import React, {useEffect, useState} from 'react';
import useJobs from './useJob';
import JobsEntry from './jobsEntry';
import JobCard from './jobCard';
import {Jobs} from './model/jobs';
import './jobsGallery.css';

function JobsGallery() {
    const [jobs, fetchJobs] = useJobs();
    const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null | undefined>(null);
    const [showGallery, setShowGallery] = useState(true);
    const [galleryStatus, setGalleryStatus] = useState(true);


    useEffect(() => {
        fetchJobs();
    }, []);

    const handleJobClick = (job: Jobs) => {
        setSelectedJob(job);
        setSelectedJobId(job.id);
        setShowGallery(false);
        console.log(job);
    };

    const handleShowGallery = () => {
        setShowGallery(true);
        setGalleryStatus(true);
    };

    const handleAcceptJob = () => {
        if (selectedJob) {
            const updatedJob: Jobs = {...selectedJob, status: 'accepted'};
            setSelectedJob(updatedJob);
            fetchJobs();
            setShowGallery(true);
        }
    };

    const handleRejectJob = () => {
        if (selectedJob) {
            const updatedJob: Jobs = {...selectedJob, status: 'rejected'};
            setSelectedJob(updatedJob);
            fetchJobs();
            setShowGallery(true);

        }
    };

    return (
        <div>
            {showGallery ? (
                <div className="jobGallery">
                    <header> Aufträge</header>
                    {jobs.map((currentJob) => (
                        <div key={currentJob.id} onClick={() => handleJobClick(currentJob)}>
                            <JobsEntry
                                job={currentJob}
                                selectedJobId={selectedJobId || null}
                                selectedJobStatus={selectedJob?.status}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {selectedJob && (
                        <JobCard
                            job={selectedJob}
                            onAccept={handleAcceptJob}
                            onReject={handleRejectJob}
                        />
                    )}
                    <br/>
                    <button onClick={handleShowGallery}>Zurück zur Galerie</button>
                </div>
            )}
        </div>
    );
}

export default JobsGallery;
