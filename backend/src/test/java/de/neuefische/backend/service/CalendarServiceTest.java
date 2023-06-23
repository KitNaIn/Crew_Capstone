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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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

}