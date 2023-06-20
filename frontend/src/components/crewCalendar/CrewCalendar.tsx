import React, { useEffect, useState } from 'react';
import './CrewCalendar.css';
import useCalendarEvent from "./useCalendar";
import CalendarDays from "./CalendarDays";


function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const today = new Date();
    const [calendarEvent, fetchCalendarEvent] = useCalendarEvent();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        fetchCalendarEvent();
    }, [fetchCalendarEvent]);

    const handlePrevMonth = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
        setDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
        setDate(nextMonth);
    };

    const handleDateClick = (day : Date | null) => {
        // Dummy function for handling date click
        console.log('Clicked date:', day);
    };

    return (
        <div className="Calendar">
            <header>Verfügbarkeiten</header>
            <br />
            <div className="CalendarNav">
                <button onClick={handlePrevMonth}>Prev Month</button>
                <span>
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomCalendar;
