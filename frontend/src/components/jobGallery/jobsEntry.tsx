import React from 'react';
import { Jobs } from './model/jobs';
import './jobsGallery.css';

type Props = {
    job: Jobs;
    selectedJobId: string | null | undefined;
    userId : string;
};

function JobsEntry({ job, userId }: Props) {


    const getStatusIcon = () => {
        if (job.acceptedUsers && job.acceptedUsers.includes(userId)) {
            return <span className="status-icon-accept">&#10004;</span>;
        } else if (job.rejectedUsers && job.rejectedUsers.includes(userId)) {
            return <span className="status-icon-reject">&#10008;</span>;
        }
        return null;
    };

    return (
        <div className="jobCard">
            <div>
                {getStatusIcon()}
                <span className="status-text">
          {job.acceptedUsers?.includes(userId)
              ? 'Angenommen'
              : job.rejectedUsers?.includes(userId)
                  ? 'Abgelehnt'
                  : ''}
        </span>
            </div>
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
