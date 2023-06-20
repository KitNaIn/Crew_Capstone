import React from "react";

interface CalendarDayProps {
    day: Date | null;
    isCurrentDay: boolean | null;
    handleDateClick: (day: Date | null) => void;
}

function CalendarDay({ day, isCurrentDay, handleDateClick }: CalendarDayProps) {
    const highlightClassName = isCurrentDay === true ? "highlight" : "";

    return (
        <td
            className={highlightClassName}
            onClick={() => handleDateClick(day)}
        >
            {day?.getDate()}
        </td>
    );
}

export default CalendarDay;
