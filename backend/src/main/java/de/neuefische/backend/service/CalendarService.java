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
        //not used right now, will be used in  later patch
        return calendarRepo.findAll();
    }
    public List<CalendarEvent> findAllByUserId(String userId){
        return calendarRepo.findAllByUserId(userId);
    }

    public List<CalendarEvent> save(String userId, CalendarEvent calendarEvent) {
        CalendarEvent newCalendarEvent = CalendarEvent.builder()
                .uuid(generateUUIDService.generateUUID())
                .userId(userId)
                .title(calendarEvent.getTitle())
                .eventDate(calendarEvent.getEventDate())
                .startTime(calendarEvent.getStartTime())
                .endTime(calendarEvent.getEndTime())
                .notes(calendarEvent.getNotes())
                .build();

        calendarRepo.save(newCalendarEvent);
        return findAllByUserId(userId);
    }
    public CalendarEvent update(String userId, String eventId, CalendarEvent updatedEvent) {
        CalendarEvent existingEvent = calendarRepo.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid event ID"));

        if (!existingEvent.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Invalid user ID for the event");
        }

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setEventDate(updatedEvent.getEventDate());
        existingEvent.setStartTime(updatedEvent.getStartTime());
        existingEvent.setEndTime(updatedEvent.getEndTime());
        existingEvent.setNotes(updatedEvent.getNotes());

        calendarRepo.save(existingEvent);
        return existingEvent;
    }
    public void delete(String userId, String eventId) {
        List<CalendarEvent> events = calendarRepo.findAllByUserId(userId);
        CalendarEvent eventToDelete = events.stream()
                .filter(event -> event.getUuid().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        calendarRepo.delete(eventToDelete);
    }

}
