package de.neuefische.backend.controller;

import de.neuefische.backend.service.JobService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;



@SpringBootTest
@AutoConfigureMockMvc
class JobControllerTest {

    @Mock
    private JobService jobService;
    @Autowired
    private MockMvc mockMvc;
    @Test
    void getAllJobs() {

    }

    @Test
    void getAllJobsSortedByDateTime() {
    }

    @Test
    void saveJob() {
    }

    @Test
    void updateJobStatus() {
    }

    @Test
    void deleteJob() {
    }
}