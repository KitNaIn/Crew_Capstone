package de.neuefische.backend.service;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.repo.CalendarRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepo calendarRepo;
    private final GenerateUUIDService generateUUIDService;

    public List<CalendarEvent> findAll() {
        return calendarRepo.findAll();
    }

    public List<CalendarEvent> save(CalendarEvent calendarEvent) {
        CalendarEvent newCalendarEvent = CalendarEvent.builder()
                .uuid(generateUUIDService.generateUUID())
                .title(calendarEvent.getTitle())
                .eventDate(calendarEvent.getEventDate())
                .startTime(calendarEvent.getStartTime())
                .endTime(calendarEvent.getEndTime())
                .notes(calendarEvent.getNotes())
                .build();

        calendarRepo.save(newCalendarEvent);
        return findAll();
    }

}
