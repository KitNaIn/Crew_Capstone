import React, { useEffect, useState } from 'react';
import useCalendarEvent from "./useCalendar";
import CalendarDays from "./CalendarDays";
import './crewCalendar.css';
import { CalendarEvent } from "./model/Event";
import timeOptions from "./timeOptions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const today = new Date();
    const [calendarEvent, fetchCalendarEvent, saveCalendarEvent] = useCalendarEvent();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        fetchCalendarEvent();
    }, []);

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
            setNewEvent({ ...newEvent, eventDate: day.toISOString() });
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
        saveCalendarEvent(newEvent);
        setShowModal(false);
    };
    const isEventDate = (day: Date | null) => {
        if (day !== null) {
            const foundEvent = calendarEvent.find((event: CalendarEvent) => new Date(event.eventDate).toDateString() === day.toDateString());
            return foundEvent !== undefined;
        }
        return false;
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
                <ul>
                    {calendarEvent?.map((event) => (
                        <li key={event.uuid}>
                            <div>
                                <strong>Titel:</strong> {event.title}
                            </div>
                            <strong>Datum:</strong> {event.eventDate}
                            <div>
                                <strong>Startzeit:</strong> {event.startTime}
                            </div>
                            <div>
                                <strong>Endzeit:</strong> {event.endTime}
                            </div>
                            <div>
                                <strong>Notizen:</strong> {event.notes}
                            </div>
                        </li>
                    ))}
                </ul>
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
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCalendar;
