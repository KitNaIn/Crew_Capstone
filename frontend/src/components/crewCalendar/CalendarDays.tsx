import React from "react";
import getCalendarDays from "./calendarUtils";
import CalendarDay from "./CalendarDay";

interface CalendarDaysProps {
    date: Date;
    today: Date;
    handleDateClick: (day: Date | null) => void;
}

function CalendarDays({ date, today, handleDateClick }: CalendarDaysProps) {
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1?.getDate() === date2?.getDate() &&
            date1?.getMonth() === date2?.getMonth() &&
            date1?.getFullYear() === date2?.getFullYear()
        );
    };

    const calendarDays = getCalendarDays(date);

    return (
        <tr>
            {calendarDays.map((week, weekIndex) => (
                // eslint-disable-next-line
                <React.Fragment key={`week-${weekIndex}`}>
                    {week.map((day, dayIndex) => {
                        const isCurrentDay = day && isSameDay(day, today);
                        const uniqueKey = `day-${weekIndex}-${dayIndex}`;

                        return (
                            <CalendarDay
                                key={uniqueKey}
                                day={day}
                                isCurrentDay={isCurrentDay}
                                handleDateClick={handleDateClick}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </tr>
    );
}

export default CalendarDays;
