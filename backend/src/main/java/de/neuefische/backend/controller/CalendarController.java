package de.neuefische.backend.controller;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendarevents")
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping
    public List<CalendarEvent> getAllCalendarEvents() {
        return calendarService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<CalendarEvent> saveCalendarEvent(@RequestBody CalendarEvent calendarEvent) {
        return calendarService.save(calendarEvent);
    }

}
