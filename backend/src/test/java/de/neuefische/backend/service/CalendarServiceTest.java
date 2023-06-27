package de.neuefische.backend.service;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.repo.CalendarRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CalendarServiceTest {

    private CalendarRepo calendarRepo;
    private CalendarService calendarService;
    private GenerateUUIDService generateUUIDService;

    @BeforeEach
    public void setup() {
        calendarRepo = Mockito.mock(CalendarRepo.class);
        generateUUIDService = Mockito.mock(GenerateUUIDService.class);
        calendarService = new CalendarService(calendarRepo, generateUUIDService);
    }


    @Test
    void save_ShouldCreateCalendarEvent_andReturnArray_WithEvent() {
        //GIVEN
        String userId = "user123";
        CalendarEvent inputEvent = CalendarEvent.builder()
                .title("Test Title")
                .userId("user123")
                .eventDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(14, 0))
                .notes("Test Notes")
                .build();

        CalendarEvent generatedCalendarEvent = CalendarEvent.builder()
                .uuid("1")
                .title(inputEvent.getTitle())
                .userId(inputEvent.getUserId())
                .eventDate(inputEvent.getEventDate())
                .startTime(inputEvent.getStartTime())
                .endTime(inputEvent.getEndTime())
                .notes(inputEvent.getNotes())
                .build();

        List<CalendarEvent> sampleEvent = new ArrayList<>();
        sampleEvent.add(generatedCalendarEvent);

        when(generateUUIDService.generateUUID()).thenReturn("1");
        when(calendarRepo.findAllByUserId(inputEvent.getUserId())).thenReturn(sampleEvent);

        //WHEN
        List<CalendarEvent> result = calendarService.save(userId, inputEvent);
        //THEN
        verify(calendarRepo).save(generatedCalendarEvent);
        verify(generateUUIDService).generateUUID();
        verify(calendarRepo).findAllByUserId(userId);
        assertEquals(1, result.size());
        assertTrue(result.contains(generatedCalendarEvent));
    }
    @Test
    void findAllByUserId_ShouldReturnListOfCalendarEvents() {
        // GIVEN
        String userId = "user123";
        List<CalendarEvent> expectedEvents = new ArrayList<>();
        expectedEvents.add(CalendarEvent.builder().uuid("1").userId(userId).build());
        expectedEvents.add(CalendarEvent.builder().uuid("2").userId(userId).build());
        when(calendarRepo.findAllByUserId(userId)).thenReturn(expectedEvents);

        // WHEN
        List<CalendarEvent> result = calendarService.findAllByUserId(userId);

        // THEN
        assertEquals(expectedEvents, result);
        verify(calendarRepo).findAllByUserId(userId);
    }
    @Test
    void update_ShouldUpdateCalendarEvent_andReturnUpdatedEvent() {
        // GIVEN
        String userId = "user123";
        String eventId = "1";

        CalendarEvent existingEvent = CalendarEvent.builder()
                .uuid(eventId)
                .userId(userId)
                .title("Old Title")
                .eventDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(14, 0))
                .notes("Old Notes")
                .build();

        CalendarEvent updatedEvent = CalendarEvent.builder()
                .title("New Title")
                .eventDate(LocalDate.now().plusDays(1))
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(15, 0))
                .notes("New Notes")
                .build();

        when(calendarRepo.findById(eventId)).thenReturn(java.util.Optional.of(existingEvent));
        when(calendarRepo.save(existingEvent)).thenReturn(existingEvent);

        // WHEN
        CalendarEvent result = calendarService.update(userId, eventId, updatedEvent);

        // THEN
        verify(calendarRepo).findById(eventId);
        verify(calendarRepo).save(existingEvent);
        assertEquals("New Title", result.getTitle());
        assertEquals(LocalDate.now().plusDays(1), result.getEventDate());
        assertEquals(LocalTime.of(10, 0), result.getStartTime());
        assertEquals(LocalTime.of(15, 0), result.getEndTime());
        assertEquals("New Notes", result.getNotes());
    }
    @Test
    void update_ShouldThrowException_WhenInvalidUserId() {
        // GIVEN
        String userId = "user123";
        String eventId = "1";

        CalendarEvent existingEvent = CalendarEvent.builder()
                .uuid(eventId)
                .userId("otherUser")
                .title("Old Title")
                .eventDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(14, 0))
                .notes("Old Notes")
                .build();

        CalendarEvent updatedEvent = CalendarEvent.builder()
                .title("New Title")
                .eventDate(LocalDate.now().plusDays(1))
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(15, 0))
                .notes("New Notes")
                .build();

        when(calendarRepo.findById(eventId)).thenReturn(java.util.Optional.of(existingEvent));

        // THEN
        assertThrows(IllegalArgumentException.class, () -> calendarService.update(userId, eventId, updatedEvent));
        verify(calendarRepo).findById(eventId);
        verify(calendarRepo, never()).save(existingEvent);
    }
    @Test
    void delete_ShouldDeleteCalendarEvent() {
        // GIVEN
        String userId = "user123";
        String eventId = "1";

        CalendarEvent eventToDelete = CalendarEvent.builder()
                .uuid(eventId)
                .userId(userId)
                .build();

        List<CalendarEvent> events = new ArrayList<>();
        events.add(eventToDelete);

        when(calendarRepo.findAllByUserId(userId)).thenReturn(events);

        // WHEN
        calendarService.delete(userId, eventId);

        // THEN
        verify(calendarRepo).findAllByUserId(userId);
        verify(calendarRepo).delete(eventToDelete);
    }
    @Test
    void delete_ShouldThrowException_WhenEventNotFound() {
        // GIVEN
        String userId = "user123";
        String eventId = "1";

        List<CalendarEvent> events = new ArrayList<>();

        when(calendarRepo.findAllByUserId(userId)).thenReturn(events);

        // THEN
        assertThrows(IllegalArgumentException.class, () -> calendarService.delete(userId, eventId));
        verify(calendarRepo).findAllByUserId(userId);
        verify(calendarRepo, never()).delete(any());
    }

}