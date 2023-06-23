import { useState } from 'react';
import { CalendarEvent } from './model/Event';
import axios from 'axios';

type useCalendarEventType = [
    CalendarEvent[],
    () => Promise<void>,
    (event: CalendarEvent) => Promise<void>
];

const useCalendarEvent = (userId: string): useCalendarEventType => {
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);


    const fetchCalendarEvent = async () => {
        try {
            const response = await axios.get(`/api/calendarevents/${userId}`);
            setCalendarEvent(response.data);
        } catch (error) {
            console.error('Error fetching calendar events: ', error);
            setCalendarEvent([]);
        }
    };

    const saveCalendarEvent = async (event: CalendarEvent) => {
        try {
            const response = await axios.post(`/api/calendarevents/${userId}`, event);
            if (response.status === 201) {
                await fetchCalendarEvent();
            } else {
                console.error('Error saving event');
            }
        } catch (error) {
            console.error('Error saving event: ', error);
        }
    };

    return [calendarEvent, fetchCalendarEvent, saveCalendarEvent];
};

export default useCalendarEvent;
