package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Job;
import de.neuefische.backend.repo.JobRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import de.neuefische.backend.service.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;



import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private GenerateUUIDService generateUUIDService;

    @BeforeEach
    void setup() {
    }

    @Test
    void getAllJobs_ReturnsListOfJobs() throws Exception {
        //GIVEN
        jobRepo.save(new Job("1", "Format1", "Issuer1", "Contact1", "Address1", LocalDate.now(), LocalTime.now(), LocalTime.now().plusHours(1), "Status1", "Comment1"));
        jobRepo.save(new Job("2", "Format2", "Issuer2", "Contact2", "Address2", LocalDate.now().plusDays(1), LocalTime.now(), LocalTime.now().plusHours(2), "Status2", "Comment2"));
        // WHEN
        MvcResult mvcResult = mockMvc.perform(get("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        // THEN
        List<Job> jobList = objectMapper.readValue(mvcResult.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, Job.class));
        assertThat(jobList).hasSize(2);
    }

    @Test
    void getAllJobsSortedByDateTime_ReturnsSortedListOfJobs() throws Exception {
        // WHEN
        MvcResult mvcResult = mockMvc.perform(get("/api/jobs/sorted")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        // THEN
        List<Job> sortedJobList = objectMapper.readValue(mvcResult.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, Job.class));
        List<Job> expectedJobList = jobService.getAllJobsSortedByDateTime();
        assertThat(sortedJobList).containsExactlyElementsOf(expectedJobList);
    }



}
