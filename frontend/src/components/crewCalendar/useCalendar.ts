import { useState } from 'react';
import { CalendarEvent } from "./model/Event";
import axios from "axios";

type useCalendarEventType = [CalendarEvent[], () => void, (event: CalendarEvent) => void];

const useCalendarEvent = (): useCalendarEventType => {
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);

    const fetchCalendarEvent = async () => {
        const url = "/api/calendarevents";

        await axios
            .get(url)
            .then((response) => {
                setCalendarEvent(response.data);
            })
            .catch((error) => {
                console.error('Error fetching jobs ', error);
                setCalendarEvent([]);
            });
    };

    const saveCalendarEvent = async (event: CalendarEvent) => {
        try {
            const response =
                await axios.post("/api/calendarevents", event);

            if (response.status === 201) {
                fetchCalendarEvent();
            } else {
                console.error('Fehler beim Speichern des Events');
            }
        } catch (error) {
            console.error("Fehler beim Speichern des Events: ", error);
        }
    };

    return [calendarEvent, fetchCalendarEvent, saveCalendarEvent];
};

export default useCalendarEvent;
