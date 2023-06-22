package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CalendarControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser
    void getAllCalendarEvents_ShouldReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/calendarevents"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}