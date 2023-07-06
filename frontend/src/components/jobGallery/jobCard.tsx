import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Jobs} from './model/jobs';
import './jobsGallery.css';
import {formatDate, formatTime} from '../utility/dateUtils';
import {CalendarEvent} from '../crewCalendar/model/Event';
import useCalendarEvent from "../crewCalendar/useCalendar";
import axios from "axios";


type Props = {
    job: Jobs;
    onAccept: () => void;
    onReject: () => void;
    setSelectedJobStatus: Dispatch<SetStateAction<string | undefined>>;
    saveCalendarEvent: (event: CalendarEvent) => Promise<void>;

};

function JobCard({job, onAccept, onReject, setSelectedJobStatus}: Props) {


    const [userId, setUserId] = useState('');
    const [,, saveCalendarEvent] = useCalendarEvent(userId);

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

    const handleAccept = async () => {
        onAccept();
        setSelectedJobStatus('accepted');
        await saveCalendarEvent({
            uuid: job.uuid,
            title: job.issuer,
            eventStartDate: job.jobDate,
            startTime: job.startTime,
            eventEndDate: job.jobDate,
            endTime: job.endTime,
            notes: job.jobComment
        });
    };

    const handleReject = () => {
        onReject();
        setSelectedJobStatus('rejected')
    };


    return (
        <div>
            <h1 className='header'>Auftragsdetails</h1>
            <div className="jobCardDetails">
                <p>
                    {formatDate(job.jobDate)} {formatTime(job.startTime) + 'Uhr'} - {formatTime(job.endTime) + 'Uhr'}
                </p>
                <p>{job.jobFormat}</p>
                <p style={{marginLeft: '1.5vh'}}>
                    {job.issuer} {job.jobAddress}
                </p>
                <p> Ansprechpartner/in: {job.contactPerson}</p>
                <p style={{border: '1px solid black', padding: '10px'}}>
                    {job.jobComment}
                </p>
                <input
                    placeholder="Fragen oder Rückmeldungen zu diesem Auftrag?"
                    style={{width: '40vh', height: '15vh', marginTop: '12vh'}}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '45vh',
                        margin: '1.5vh',
                    }}
                >
                    <button className='accept-button' onClick={handleAccept}>
                        <span className='accept-span'>
                           annehmen
                        </span>
                    </button>
                    <button className='reject-button' onClick={handleReject}>
                        <span className='reject-span'>
                        ablehnen
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobCard;
