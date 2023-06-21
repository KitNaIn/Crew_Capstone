import React from 'react';
import {Jobs} from './model/jobs';
import './jobsGallery.css';


type Props = {
    job: Jobs;
    onAccept: () => void;
    onReject: () => void;
};

function JobCard({job, onAccept, onReject}: Props) {
    return (
        <div>
            <header>Auftragsdetails</header>
            <div className="jobCardDetails">
                <p>{job.jobDate} {job.startTime} - {job.endTime}</p>
                <p>{job.jobFormat}</p>
                <p>{job.issuer} {job.jobAddress}</p>
                <p> Ansprechpartner/in : {job.contactPerson}</p>
                <p style={{border: '1px solid black', padding: '10px'}}>{job.jobComment}</p>
                <input placeholder="Fragen oder Rückmeldungen zu diesem Auftrag?"
                       style={{width: '40vh', height: '15vh'}}/>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '45vh', margin: '1.5vh'}}>
                    <button onClick={onAccept}>Annehmen</button>
                    <button onClick={onReject}>Ablehnen</button>
                </div>
            </div>
        </div>
    );
}

export default JobCard;