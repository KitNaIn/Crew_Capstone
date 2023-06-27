package de.neuefische.backend.controller;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendarevents/{userId}")
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping
    public List<CalendarEvent> getAllCalendarEvents(@PathVariable String userId) {
        return calendarService.findAllByUserId(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<CalendarEvent> saveCalendarEvent(@RequestBody CalendarEvent calendarEvent, @PathVariable String userId) {
        calendarService.save(userId, calendarEvent);
        return calendarService.findAllByUserId(userId);
    }
    @PutMapping("/{eventId}")
    public CalendarEvent updateCalendarEvent(
            @PathVariable String userId,
            @PathVariable String eventId,
            @RequestBody CalendarEvent updatedEvent) {
        return calendarService.update(userId, eventId, updatedEvent);
    }



}
