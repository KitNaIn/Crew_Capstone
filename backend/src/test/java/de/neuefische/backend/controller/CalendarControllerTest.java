package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.service.CalendarService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CalendarService calendarService;

    @Test
    @WithMockUser
    void getAllCalendarEvents_ShouldReturnEmptyList() throws Exception {
        // GIVEN
        String userId = "test-user";

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/calendarevents/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void saveCalendarEvent_ShouldReturnCalendarEventsWithAddedEvent_andStatusCode201() throws Exception {
        // GIVEN
        String userId = "test-user";
        LocalDate eventDate = LocalDate.parse("2023-06-14");
        LocalTime startTime = LocalTime.parse("10:00:00");
        LocalTime endTime = LocalTime.parse("12:00:00");

        CalendarEvent calendarEvent = CalendarEvent.builder()
                .userId(userId)
                .title("Event")
                .eventDate(eventDate)
                .startTime(startTime)
                .endTime(endTime)
                .notes("Event notes")
                .build();

        String calendarEventJson = objectMapper.writeValueAsString(calendarEvent);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/calendarevents/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(calendarEventJson)
                        .with(csrf()))
                .andExpect(status().isCreated());

        // THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/calendarevents/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").value(userId))
                .andExpect(jsonPath("$[0].title").value("Event"))
                .andExpect(jsonPath("$[0].eventDate").value("2023-06-14"))
                .andExpect(jsonPath("$[0].startTime").value("10:00:00"))
                .andExpect(jsonPath("$[0].endTime").value("12:00:00"))
                .andExpect(jsonPath("$[0].notes").value("Event notes"));
    }
}
