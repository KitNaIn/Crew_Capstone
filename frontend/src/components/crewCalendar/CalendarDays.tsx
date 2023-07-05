import React from "react";
import getCalendarDays from "./calendarUtils";
import CalendarDay from "./CalendarDay";
import './crewCalendar.css'

interface CalendarDaysProps {
    date: Date;
    today: Date;
    handleDateClick: (day: Date | null) => void;
    isEventDate: (day: Date | null) => boolean;
}

function CalendarDays({ date, today, handleDateClick, isEventDate }: CalendarDaysProps) {
    const isSameDay = (date1: Date | null, date2: Date) => {
        return (
            date1?.getDate() === date2?.getDate() &&
            date1?.getMonth() === date2?.getMonth() &&
            date1?.getFullYear() === date2?.getFullYear()
        );
    };

    const calendarDays = getCalendarDays(date);

    return (
        <>
            {calendarDays.map((week, weekIndex) => (
                <tr className="days" key={`week-${weekIndex}`}>
                    {week.map((day, dayIndex) => (
                        <CalendarDay
                            key={`day-${weekIndex}-${dayIndex}`}
                            day={day}
                            isCurrentDay={isSameDay(day, today)}
                            isEventDate={isEventDate}
                            handleDateClick={handleDateClick}
                        />
                    ))}
                </tr>
            ))}
        </>
    );
}

export default CalendarDays;
