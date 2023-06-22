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
        calendarService = Mockito.mock(CalendarService.class);
        generateUUIDService = Mockito.mock(GenerateUUIDService.class);
        calendarService = new CalendarService(calendarRepo, generateUUIDService);
    }

    @Test
    void save_ShouldCreateCalendarEvent_andReturnArray_WithEvent() {
        //GIVEN
        CalendarEvent InputEvent = CalendarEvent.builder()
                .title("Test Title")
                .eventDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(14, 0))
                .notes("Test Notes")
                .build();

        CalendarEvent generatedCalendarEvent = CalendarEvent.builder()
                .uuid("1")
                .title(InputEvent.getTitle())
                .eventDate(InputEvent.getEventDate())
                .startTime(InputEvent.getStartTime())
                .endTime(InputEvent.getEndTime())
                .notes(InputEvent.getNotes())
                .build();

        List<CalendarEvent> sampleEvent = new ArrayList<>();
        sampleEvent.add(generatedCalendarEvent);

        when(generateUUIDService.generateUUID()).thenReturn("1");
        when(calendarRepo.findAll()).thenReturn(sampleEvent);
        //WHEN
        List<CalendarEvent> result = calendarService.save(InputEvent);
        //THEN
        assertEquals(1, result.size());
        assertTrue(result.contains(generatedCalendarEvent));
        verify(calendarRepo).save(generatedCalendarEvent);
        verify(generateUUIDService).generateUUID();
        verify(calendarRepo).findAll();
    }
}