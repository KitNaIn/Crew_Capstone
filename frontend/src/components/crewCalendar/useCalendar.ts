import { useState } from 'react';
import { CalendarEvent } from './model/Event';
import axios from 'axios';

type Props = [
    CalendarEvent[],
    () => Promise<void>,
    (event: CalendarEvent) => Promise<void>,
    (userId: string, eventId: string, event: CalendarEvent) => Promise<void>
];

const useCalendarEvent = (userId: string): Props => {
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

    const fetchCalendarEvents = async () => {
        try {
            const response = await axios.get(`/api/calendarevents/${userId}`);
            setCalendarEvents(response.data);
        } catch (error) {
            console.error('Error fetching calendar events: ', error);
            setCalendarEvents([]);
        }
    };

    const saveCalendarEvent = async (event: CalendarEvent) => {
        try {
            const response = await axios.post(`/api/calendarevents/${userId}`, event);
            if (response.status === 201) {
                await fetchCalendarEvents();
            } else {
                console.error('Error saving event');
            }
        } catch (error) {
            console.error('Error saving event: ', error);
        }
    };

    const updateCalendarEvent = async (userId: string, eventId: string, event: CalendarEvent) => {
        try {
            const response = await axios.put(`/api/calendarevents/${userId}/${eventId}`, event);
            if (response.status === 200) {
                console.log('Event updated successfully');
                await fetchCalendarEvents();
            } else {
                console.error('Error updating event');
            }
        } catch (error) {
            console.error('Error updating event: ', error);
        }
    };

    return [calendarEvents, fetchCalendarEvents, saveCalendarEvent, updateCalendarEvent];
};

export default useCalendarEvent;
