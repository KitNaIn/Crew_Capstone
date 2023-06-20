import {useState} from 'react';
import {CalendarEvent} from "./model/Event";
import axios from "axios";



type useCalendarEventType = [CalendarEvent[], () => void];

const useCalendarEvent = () : useCalendarEventType => {
    const [calendarEvent, setCalendarEvent] = useState< CalendarEvent[]>([])

    const fetchCalendarEvent = () => {
        const url="/api/calendarevents";

        axios
            .get(url)
            .then((response) => {
                setCalendarEvent(response.data);
            })
            .catch((error) => {
            console.error('Error fetching jobs ',error);
            setCalendarEvent([])
        });
    };
    return [calendarEvent, fetchCalendarEvent]
}
export default useCalendarEvent;