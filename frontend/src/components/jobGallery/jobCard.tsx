import React, {Dispatch, SetStateAction} from 'react';
import { Jobs } from './model/jobs';
import './jobsGallery.css';
import {formatTime, formatDate} from '../utility/dateUtils';


type Props = {
    job: Jobs;
    onAccept: () => void;
    onReject: () => void;
    setSelectedJobStatus: Dispatch<SetStateAction<string | undefined>>;
};

function JobCard({ job, onAccept, onReject, setSelectedJobStatus }: Props) {
    const handleAccept = () => {
        onAccept();
        setSelectedJobStatus('accepted');
    };

    const handleReject = () => {
        onReject();
        setSelectedJobStatus('rejected')

    };



    return (
        <div>
            <header>Auftragsdetails</header>
            <div className="jobCardDetails">
                <p>
                    {formatDate(job.jobDate)} {formatTime(job.startTime) + 'Uhr'} - {formatTime(job.endTime) + 'Uhr'}
                </p>
                <p>{job.jobFormat}</p>
                <p style={{ marginLeft:'1.5vh'}}>
                    {job.issuer} {job.jobAddress}
                </p>
                <p> Ansprechpartner/in: {job.contactPerson}</p>
                <p style={{ border: '1px solid black', padding: '10px' }}>
                    {job.jobComment}
                </p>
                <input
                    placeholder="Fragen oder Rückmeldungen zu diesem Auftrag?"
                    style={{ width: '40vh', height: '15vh' , marginTop:'12vh'}}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '45vh',
                        margin: '1.5vh',
                    }}
                >
                    <button onClick={handleAccept}>Annehmen</button>
                    <button onClick={handleReject}>Ablehnen</button>
                </div>
            </div>
        </div>
    );
}

export default JobCard;
