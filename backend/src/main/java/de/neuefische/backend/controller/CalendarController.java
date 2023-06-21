package de.neuefische.backend.controller;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendarevents")
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping
    public List<CalendarEvent> getAllCalendarEvents(){
        return calendarService.findAll();
    }
}
