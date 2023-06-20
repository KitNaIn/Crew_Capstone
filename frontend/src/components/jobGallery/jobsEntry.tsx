import React from 'react';
import {Jobs} from './model/Jobs';


type Props = {
    job: Jobs;
    selectedJobId: string | null | undefined;
    selectedJobStatus: string | undefined;
};

function JobsEntry({job, selectedJobId, selectedJobStatus}: Props) {
    return (
        <div className="jobCard">
            {selectedJobId === job.id && selectedJobStatus === 'accepted' && (
                <div className="status-accepted">
                    <span className="status-icon-accept">&#10004;</span>
                    <span className="a">Angenommen</span>
                </div>
            )}
            {selectedJobId === job.id && selectedJobStatus === 'rejected' && (
                <div className="status-rejected">
                    <span className="status-icon-reject">&#10008;</span>
                    <span className="b">Abgelehnt</span>
                </div>
            )}
            <div style={{display: 'flex'}}>
                <p style={{color: 'grey'}}>{job.jobDate}</p>
                <p>{job.startTime} - {job.endTime}</p>
            </div>
            <p style={{color: 'grey'}}>{job.jobFormat}</p>
            <p>{job.issuer}</p>
        </div>
    );
}

export default JobsEntry;