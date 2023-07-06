import React from 'react';
import { Jobs } from './model/jobs';
import './jobsGallery.css';
import {formatTime, formatDate} from '../utility/dateUtils';

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
                <span className={`status-text${job.acceptedUsers?.includes(userId) ? ' status-text-accepted' : ''}${job.rejectedUsers?.includes(userId) ? ' status-text-rejected' : ''}`}>
          {job.acceptedUsers?.includes(userId)
              ? ' Angenommen'
              : job.rejectedUsers?.includes(userId)
                  ? ' Abgelehnt'
                  : ''}
        </span>
            </div>
            <div style={{ display: 'flex' }}>
                <p style={{ color: 'darkslategrey' }}>{formatDate(job.jobDate)}</p>

                <p>
                    {formatTime(job.startTime)} - {formatTime(job.endTime)}
                </p>
            </div>
            <p style={{ color: 'darkslategrey' }}>{job.jobFormat}</p>
            <p>{job.issuer}</p>
        </div>
    );
}

export default JobsEntry;
