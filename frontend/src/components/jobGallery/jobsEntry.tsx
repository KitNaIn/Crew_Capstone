import React from 'react';
import { Jobs } from './model/jobs';
import './jobsGallery.css';

type Props = {
    job: Jobs;
    selectedJobId: string | null | undefined;
    selectedJobStatus: string | null | undefined;
};

function JobsEntry({ job, selectedJobId, selectedJobStatus }: Props) {
    const getStatusIcon = (status: string) => {
        if (status.toLowerCase() === 'accepted') {
            return <span className="status-icon-accept">&#10004;</span>;
        } else if (status.toLowerCase() === 'rejected') {
            return <span className="status-icon-reject">&#10008;</span>;
        }
        return null;
    };

    return (
        <div className="jobCard">
            {selectedJobId === job.uuid && (
                <div>
                    {getStatusIcon(selectedJobStatus || job.userStatus || '')}
                    <span className="status-text">
                        {selectedJobStatus?.toLowerCase() === 'accepted'
                            ? 'Angenommen'
                            : selectedJobStatus?.toLowerCase() === 'rejected'
                                ? 'Abgelehnt'
                                : ''}
                    </span>
                </div>
            )}
            <div style={{ display: 'flex' }}>
                <p style={{ color: 'grey' }}>{job.jobDate}</p>
                <p>
                    {job.startTime} - {job.endTime}
                </p>
            </div>
            <p style={{ color: 'grey' }}>{job.jobFormat}</p>
            <p>{job.issuer}</p>
        </div>
    );
}

export default JobsEntry;
