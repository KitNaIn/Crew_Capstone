import React from "react";
import './crewCalendar.css'

interface CalendarDayProps {
    day: Date | null;
    isCurrentDay: boolean | null;
    handleDateClick: (day: Date | null) => void;
    isEventDate: (day: Date | null) => boolean;
}

function CalendarDay({ day, isCurrentDay, handleDateClick, isEventDate }: CalendarDayProps) {

    const eventClassName = isEventDate(day!) ? "hasEvent":"";
    const highlightClassName = isCurrentDay === true || isEventDate(day) ? "highlight" : "";
    return (
        <td
            className={`${highlightClassName} ${eventClassName}`}
            onClick={() => handleDateClick(day)}
        >
            {day?.getDate()}
        </td>
    );
}

export default CalendarDay;
