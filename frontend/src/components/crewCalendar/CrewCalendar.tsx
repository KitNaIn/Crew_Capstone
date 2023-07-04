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
        eventDate: '',
        startTime: '',
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
            const existingEvent = calendarEvent.find((event: CalendarEvent) => new Date(event.eventDate).toDateString() === day.toDateString());
            if (existingEvent) {
                setNewEvent(existingEvent);
            } else {
                setNewEvent({
                    uuid: '',
                    title: "",
                    eventDate: day.toISOString(),
                    startTime: '',
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

    const handleDateChange = (selectedDate: Date) => {
        setNewEvent({ ...newEvent, eventDate: selectedDate.toISOString() });
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
            const foundEvent = calendarEvent.find((event: CalendarEvent) => new Date(event.eventDate).toDateString() === day.toDateString());
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
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);
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
            <header>Verfügbarkeiten</header>
            <br />
            <div className="CalendarNav">
                <button onClick={handlePrevMonth}>Prev Month</button>
                <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={handleNextMonth}>Next Month</button>
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
                <h3>Termine</h3>
                <div className="Carousel">
                    {sortedEvents?.map((event) => (
                        <div className="Entrys" key={event.uuid}
                        style={{backgroundImage : getBackgroundImage(event.startTime)}}>
                            <div style={{ marginTop:'1.5vh'}}>
                                <strong>Titel:</strong> {event.title}
                            </div>
                            <div>
                            <strong style={{width:'60vw'}}>Datum: </strong>{event.eventDate}
                            </div>
                            <div style={{ marginTop:'1.5vh'}}>
                                <strong>Startzeit:</strong> {event.startTime}
                            </div>
                            <div style={{ marginTop:'0.5vh'}}>
                                <strong>Endzeit:</strong> {event.endTime}
                            </div>
                            <div style={{ marginTop:'5vh', overflow:'scroll', height:'20vh'}}>
                                <strong>Notizen:</strong> {event.notes}
                            </div>
                            <div style={{ display:'flex', justifyContent:'center', marginTop:'20vh'}}>
                            <button className="EntryButton" onClick={() => handleEdit(event)}>Bearbeiten</button>
                            <button className="EntryButton" onClick={() => handleDelete(event.uuid)}>Löschen</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="Modal">
                    <div className="ModalContent">
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
                                <label htmlFor="eventDate">Datum:</label>
                                <DatePicker
                                    id="eventDate"
                                    selected={new Date(newEvent.eventDate)}
                                    onChange={handleDateChange}
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
                                >
                                    {timeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="endTime">Endzeit:</label>
                                <select
                                    id="endTime"
                                    name="endTime"
                                    value={newEvent.endTime}
                                    onChange={handleSelectChange}
                                    className="smalldDropdown"
                                >
                                    {timeOptions.map((option) => (
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
                            <button type="submit">Speichern</button>
                            <button onClick={handleUpdate}> Aktualisieren </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCalendar;
