import React, { useEffect, useState } from 'react';
import useCalendarEvent from "./useCalendar";
import CalendarDays from "./CalendarDays";
import './crewCalendar.css';
import { CalendarEvent } from "./model/Event";
import timeOptions from "./timeOptions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import morgenImage from './calendarPictures/morgen.jpg';
import mittagImage from './calendarPictures/mittag.jpg';
import abendImage from './calendarPictures/abend.jpg';
import nachtImage from './calendarPictures/nacht.jpg';
import {formatTime, formatDate} from "../utility/dateUtils";


function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const today = new Date();
    const [userId, setUserId] = useState('');
    const [calendarEvent, fetchCalendarEvent, saveCalendarEvent, updateCalendarEvent] = useCalendarEvent(userId);
    today.setHours(0, 0, 0, 0);

    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/user/me');
            const userId = response.data.id;
            setUserId(userId);
        } catch (error) {
            console.error('Error fetching userId: ', error);
        }
    };
    const deleteCalendarEvent = async (userId: string, eventId: string) => {
        try {
            const response = await axios.delete(`/api/calendarevents/${userId}/${eventId}`);
            if (response.status === 200) {
                console.log('Event gelöscht');
                await fetchCalendarEvent();
            } else {
                console.error('Fehler beim Löschen des Events');
            }
        } catch (error) {
            console.error('Fehler beim Löschen des Events: ', error);
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId !== '') {
            fetchCalendarEvent();
        }
    }, [userId]);

    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState<CalendarEvent>({
        uuid: '',
        title: "",
        eventStartDate: '',
        startTime: '',
        eventEndDate:'',
        endTime: '',
        notes: ''
    });

    const handlePrevMonth = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
        setDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
        setDate(nextMonth);
    };

    const handleDateClick = (day: Date | null) => {
        if (day) {
            const existingEvent = calendarEvent.find((event: CalendarEvent) => new Date(event.eventStartDate).toDateString() === day.toDateString());
            if (existingEvent) {
                setNewEvent(existingEvent);
            } else {
                setNewEvent({
                    uuid: '',
                    title: "",
                    eventStartDate: formatDate(day.toISOString()),
                    startTime: '',
                    eventEndDate: day.toISOString(),
                    endTime: '',
                    notes: ''
                });
            }
            setShowModal(true);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleDateChange = (selectedDate: Date | null, dateType: 'start' | 'end') => {
        if (selectedDate) {
            if (dateType === 'start') {
                setNewEvent({ ...newEvent, eventStartDate: selectedDate.toISOString() });
            } else if (dateType === 'end') {
                setNewEvent({ ...newEvent, eventEndDate: selectedDate.toISOString() });
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newEvent.uuid) {
            updateCalendarEvent(userId, newEvent.uuid, newEvent);
        } else {
            saveCalendarEvent(newEvent);
        }
        fetchCalendarEvent();
        setShowModal(false);
    };

    const isEventDate = (day: Date | null) => {
        if (day !== null) {
            const foundEvent = calendarEvent.find((event: CalendarEvent) => {
                const eventStartDate = new Date(event.eventStartDate).setHours(0, 0, 0, 0);
                const eventEndDate = new Date(event.eventEndDate).setHours(23, 59, 59, 999);
                const selectedDay = day.setHours(0, 0, 0, 0);
                return selectedDay >= eventStartDate && selectedDay <= eventEndDate;
            });
            return foundEvent !== undefined;
        }
        return false;
    };

    const handleEdit = (event: CalendarEvent) => {
        setNewEvent(event);
        setShowModal(true);
    };

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        updateCalendarEvent(userId, newEvent.uuid, newEvent);
        fetchCalendarEvent();
        setShowModal(false);
    };
    const handleDelete = async (eventId: string) => {
        if (window.confirm('Möchtest du diesen Termin wirklich löschen?')) {
            await deleteCalendarEvent(userId, eventId);
        }
    };

    const sortedEvents = calendarEvent?.sort((a, b) => {
        const dateA = new Date(a.eventStartDate);
        const dateB = new Date(b.eventStartDate);
        return dateA.getTime() - dateB.getTime();
    });

    const getBackgroundImage = (startTime: string) => {
        if (startTime >= '06:01' && startTime < '10:00') {
            return `url(${morgenImage})`;
        } else if (startTime >= '10:01' && startTime < '17:00') {
            return `url(${mittagImage})`;
        } else if (startTime >= '17:01' && startTime < '22:00') {
            return `url(${abendImage})`;
        } else if (startTime >= '22:01' || startTime < '06:00') {
            return `url(${nachtImage})`;
        } else {
            return 'none';
        }
    };
    



    return (
        <div className="Calendar">
            <h1 className="header">Verfügbarkeiten</h1>
            <br />
            <div className="CalendarNav">
                <button className='navButtons' onClick={handlePrevMonth}>Prev</button>
                <span style={{letterSpacing:'-0.5px', color:'white'}}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button className='navButtons' onClick={handleNextMonth}>Next</button>
            </div>
            <br />
            <table className="CalendarWrapper">
                <thead className="CalendarThread">
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                </thead>
                <tbody>
                <CalendarDays
                    date={date}
                    today={today}
                    handleDateClick={handleDateClick}
                    isEventDate={isEventDate}
                />
                </tbody>
            </table>
            <div className="EventList">
                <h3 style={{display:'flex', justifyContent:'center', letterSpacing:'-1px', fontSize:'20px', color:'white'}}>Termine</h3>
                <div className="Carousel">
                    {sortedEvents && sortedEvents?.map((event:CalendarEvent) => (
                        <div className="Entrys" key={event.uuid}
                        style={{backgroundImage : getBackgroundImage(event.startTime)}}>
                            <div style={{ marginTop:'1vh'}}>
                                <strong>Titel:</strong> {event.title}
                            </div>
                            <div style={{marginTop:'2vh'}}>
                                <strong style={{width:'60vw'}}>Start Datum: </strong>{formatDate(event.eventStartDate)}
                                <br/>
                                <strong>Startzeit:</strong> {formatTime(event.startTime)}
                            </div>
                            <div style={{marginTop:'2vh'}}>
                                <strong style={{width:'60vw', marginTop:'2vh'}}>End Datum: </strong>{formatDate(event.eventEndDate)}
                                <br/>
                                <strong>Endzeit:</strong> {formatTime(event.endTime)}
                            </div>
                            <div className='notes'>
                                <strong>Notizen:</strong> {event.notes}
                            </div>
                            <div style={{ display:'flex'}}>
                            <button className="navButtons" onClick={() => handleEdit(event)}>Edit</button>
                            <button className="navButtons" onClick={() => handleDelete(event.uuid)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="Modal">
                    <div className="ModalContent" style={{width:'70vw'}}>
                        <h3>Neuer Termin</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title">Titel:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="eventDate"> Start Datum:</label>
                                <DatePicker
                                    id="eventDate"
                                    selected={new Date (newEvent.eventStartDate)}
                                    onChange={(date) => handleDateChange(date, 'start')}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                            <div>
                                <label htmlFor="startTime">Startzeit:</label>
                                <select
                                    id="startTime"
                                    name="startTime"
                                    value={newEvent.startTime}
                                    onChange={handleSelectChange}
                                    className='timeDropdown'
                                    size={5}
                                >
                                    {timeOptions.map((option) => (
                                        <option className='timeTable' key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="eventDate"> End Datum:</label>
                                <DatePicker
                                    id="eventDate"
                                    selected={new Date(newEvent.eventEndDate)}
                                    onChange={(date:Date|null) => handleDateChange(date, 'end')}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                            <div>
                                <label htmlFor="endTime">Endzeit:</label>
                                <select
                                    id="endTime"
                                    name="endTime"
                                    value={newEvent.endTime}
                                    onChange={handleSelectChange}
                                    className="smalldDropdown"
                                    size={5}
                                >
                                    {timeOptions.map((option:string) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="notes">Notizen:</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={newEvent.notes}
                                    onChange={handleTextareaChange}
                                />
                            </div>
                            <div style={{display:'flex', justifyContent:'space-around'}}>
                            <button type="submit">Speichern</button>
                            <button onClick={handleUpdate}> Aktualisieren </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCalendar;
