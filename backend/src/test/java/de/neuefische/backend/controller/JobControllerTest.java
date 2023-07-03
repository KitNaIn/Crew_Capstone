package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import de.neuefische.backend.model.Job;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    void getAllJobs_ShouldReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }


    @Test
    @DirtiesContext
    @WithMockUser
    void saveJob_ShouldReturnJobWithId_andStatusCode201() throws Exception {
        //GIVEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .contentType("application/json")
                        .content("""
                                    {
                                                              
                                        "jobFormat": "Format",
                                        "issuer": "Issuer",
                                        "contactPerson": "Contact Person",
                                        "jobAddress": "Job Address",
                                        "jobDate": "2023-06-14",
                                        "startTime": "10:00:00",
                                        "endTime": "12:00:00",
                                        "status": null,
                                        "jobComment": "Job Comment"
                                    }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));


        //THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            [
                                {
                                    "jobFormat": "Format",
                                    "issuer": "Issuer",
                                    "contactPerson": "Contact Person",
                                    "jobAddress": "Job Address",
                                    "jobDate": "2023-06-14",
                                    "startTime": "10:00:00",
                                    "endTime": "12:00:00",
                                    "status": null,
                                    "jobComment": "Job Comment"
                                }
                            ]
                        """))
                .andExpect(jsonPath("$[0].uuid").exists())
                .andExpect(jsonPath("$[0].uuid").isNotEmpty());
    }


    @Test
    @DirtiesContext
    @WithMockUser
    void getAllJobsSortedByDateTime_ShouldReturnSortedJobs_andStatusCode201() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "jobFormat": "Format",
                                        "issuer": "Issuer",
                                        "contactPerson": "Contact Person",
                                        "jobAddress": "Job Address",
                                        "jobDate": "2023-06-14",
                                        "startTime": "10:00:00",
                                        "endTime": "12:00:00",
                                        "status": null,
                                        "jobComment": "Job Comment"
                                    }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                                "jobFormat": "Format",
                                "issuer": "Issuer",
                                "contactPerson": "Contact Person",
                                "jobAddress": "Job Address",
                                "jobDate": "2022-05-13",
                                "startTime": "10:00:00",
                                "endTime": "12:00:00",
                                "status": null,
                                "jobComment": "Job Comment"
                            }
                        """)
                .with(csrf())
        );
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/sorted")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].jobDate").value("2022-05-13"))
                .andExpect(jsonPath("$[1].jobDate").value("2023-06-14"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateJob_ShouldReturn_UpdatedJob() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "jobFormat": "Format",
                                        "issuer": "Issuer",
                                        "contactPerson": "Contact Person",
                                        "jobAddress": "Job Address",
                                        "jobDate": "2023-06-14",
                                        "startTime": "10:00:00",
                                        "endTime": "12:00:00",
                                        "status": null,
                                        "jobComment": "Job Comment"
                                    }
                                """))
                .andReturn();
        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Job[] addedJobs = objectMapper.readValue(content, Job[].class);
        Job addedJob = addedJobs[0];

        String updatedJobJson = """
                {
                    "jobFormat": "Updated Format",
                    "issuer": "Issuer",
                    "contactPerson": "Contact Person",
                    "jobAddress": "Job Address",
                    "jobDate": "2023-06-14",
                    "startTime": "10:00:00",
                    "endTime": "12:00:00",
                    "status": null,
                    "jobComment": "Job Comment"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/jobs/" + addedJob.getUuid())
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedJobJson))
                .andExpect(status().isOk());

        String updatedContent = mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/" + addedJob.getUuid())
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/" + addedJob.getUuid())
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(updatedContent));
    }


    @Test
    @DirtiesContext
    @WithMockUser
    void deleteJob() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "jobFormat": "Format",
                                        "issuer": "Issuer",
                                        "contactPerson": "Contact Person",
                                        "jobAddress": "Job Address",
                                        "jobDate": "2023-06-14",
                                        "startTime": "10:00:00",
                                        "endTime": "12:00:00",
                                        "status": null,
                                        "jobComment": "Job Comment"
                                    }
                                """)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();
        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Job[] addedJobs = objectMapper.readValue(content, Job[].class);
        Job addedJob = addedJobs[0];

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/jobs/" + addedJob.getUuid())
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs" + addedJob.getUuid())
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void acceptJob() throws Exception {
        //GIVEN
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "jobFormat": "Format",
                                        "issuer": "Issuer",
                                        "contactPerson": "Contact Person",
                                        "jobAddress": "Job Address",
                                        "jobDate": "2023-06-14",
                                        "startTime": "10:00:00",
                                        "endTime": "12:00:00",
                                        "status": null,
                                        "jobComment": "Job Comment"
                                    }
                                """)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();
        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Job[] addedJobs = objectMapper.readValue(content, Job[].class);
        Job addedJob = addedJobs[0];
        //WHEN && THEN

        mockMvc.perform(MockMvcRequestBuilders.put("/api/jobs/" + addedJob.getUuid() + "/userId/accept")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.acceptedUsers").isArray());

    }
}
