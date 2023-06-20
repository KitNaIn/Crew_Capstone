import React, { useState } from 'react';
import './CrewCalendar.css';
import getCalendarDays from "./getCalendarDays";

function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handlePrevMonth = () => {
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
        setDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
        setDate(nextMonth);
    };
    function isSameDay(date1: Date, date2: Date) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }


    const handleDateClick = (day: Date | null) => {
        // Dummy function for handling date click
        console.log("Clicked date:", day);
    };

    // Dummy list of calendar events
    const sortedEvents = [
        { id: 1, title: "Event 1" },
        { id: 2, title: "Event 2" },
        { id: 3, title: "Event 3" },
    ];

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
                {getCalendarDays(date).map((week, index) => (
                    <tr key={index}>
                        {week.map((day, index) => {
                            const isCurrentDay = day && isSameDay(day, today);
                            return (
                                <td
                                    key={index}
                                    className={`${isCurrentDay ? 'highlight' : ''}`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day && day.getDate()}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="EventList">
                <h3>Termine</h3>
                <div className="EventList">
                    <ul>
                        {sortedEvents.map((event, index) => (
                            <li key={event.id}>
                                <div>
                                    <strong>Titel:</strong> {event.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CustomCalendar;
