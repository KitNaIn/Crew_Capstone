
package de.neuefische.backend.service;

import de.neuefische.backend.dto.JobDto;
import de.neuefische.backend.model.Job;
import de.neuefische.backend.repo.JobRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class JobServiceTest {

    private JobRepo jobRepo;
    private JobService jobService;
    private GenerateUUIDService generateUUIDService;

    @BeforeEach
    public void setup() {
        jobRepo = Mockito.mock(JobRepo.class);
        generateUUIDService = Mockito.mock(GenerateUUIDService.class);
        jobService = new JobService(jobRepo, generateUUIDService);

    }
    @Test
    void findAllShouldReturnTwoJobs() {
        // GIVEN
        Job job1 = Job.builder()
                .uuid("1")
                .jobFormat("Format 1")
                .issuer("Issuer 1")
                .contactPerson("Person 1")
                .jobAddress("Address 1")
                .jobDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(12, 0))
                .status("Open")
                .jobComment("Comment 1")
                .build();
        Job job2 = Job.builder()
                .uuid("2")
                .jobFormat("Format 2")
                .issuer("Issuer 2")
                .contactPerson("Person 2")
                .jobAddress("Address 2")
                .jobDate(LocalDate.now().plusDays(1))
                .startTime(LocalTime.of(14, 0))
                .endTime(LocalTime.of(17, 0))
                .status("Closed")
                .jobComment("Comment 2")
                .build();
        List<Job> sampleJobs = new ArrayList<>();
        sampleJobs.add(job1);
        sampleJobs.add(job2);
        // WHEN
        when(jobRepo.findAll()).thenReturn(sampleJobs);
        List<Job> result = jobService.findAll();
        // THEN
        assertEquals(2, result.size());
        assertTrue(result.contains(job1));
        assertTrue(result.contains(job2));
    }

    @Test
    void saveShouldCreateNewJobAndReturnAllJobs() {
        // GIVEN
        Job inputJob = Job.builder()
                .jobFormat("Format 1")
                .issuer("Issuer 1")
                .contactPerson("Person 1")
                .jobAddress("Address 1")
                .jobDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(12, 0))
                .status("Open")
                .jobComment("Comment 1")
                .build();

        Job generatedJob = Job.builder()
                .uuid("1")
                .jobFormat(inputJob.getJobFormat())
                .issuer(inputJob.getIssuer())
                .contactPerson(inputJob.getContactPerson())
                .jobAddress(inputJob.getJobAddress())
                .jobDate(inputJob.getJobDate())
                .startTime(inputJob.getStartTime())
                .endTime(inputJob.getEndTime())
                .status(inputJob.getStatus())
                .jobComment(inputJob.getJobComment())
                .build();

        List<Job> sampleJobs = new ArrayList<>();
        sampleJobs.add(generatedJob);

        when(generateUUIDService.generateUUID()).thenReturn("1");
        when(jobRepo.findAll()).thenReturn(sampleJobs);

        // WHEN
        List<Job> result = jobService.save(inputJob);
        // THEN
        assertEquals(1, result.size());
        assertTrue(result.contains(generatedJob));
        Mockito.verify(jobRepo).save(generatedJob);
        Mockito.verify(generateUUIDService).generateUUID();
        Mockito.verify(jobRepo).findAll();
    }

    @Test
    void convertToJobEntityShouldReturnCorrectJob() {
        // GIVEN
        JobDto jobDto = JobDto.builder()
                .jobFormat("Format 1")
                .issuer("Issuer 1")
                .contactPerson("Person 1")
                .jobAddress("Address 1")
                .jobDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(12, 0))
                .jobComment("Comment 1")
                .build();

        // WHEN
        Job result = jobService.convertToJobEntity(jobDto);

        // THEN
        assertEquals(jobDto.getJobFormat(), result.getJobFormat());
        assertEquals(jobDto.getIssuer(), result.getIssuer());
        assertEquals(jobDto.getContactPerson(), result.getContactPerson());
        assertEquals(jobDto.getJobAddress(), result.getJobAddress());
        assertEquals(jobDto.getJobDate(), result.getJobDate());
        assertEquals(jobDto.getStartTime(), result.getStartTime());
        assertEquals(jobDto.getEndTime(), result.getEndTime());
        assertEquals(jobDto.getJobComment(), result.getJobComment());
    }
    @Test
    void convertToJobEntityShouldHandleNullValues() {
        // GIVEN
        JobDto jobDto = JobDto.builder()
                .jobFormat(null)
                .issuer(null)
                .contactPerson(null)
                .jobAddress(null)
                .jobDate(null)
                .startTime(null)
                .endTime(null)
                .jobComment(null)
                .build();

        // WHEN
        Job result = jobService.convertToJobEntity(jobDto);

        // THEN
        assertNull(result.getJobFormat());
        assertNull(result.getIssuer());
        assertNull(result.getContactPerson());
        assertNull(result.getJobAddress());
        assertNull(result.getJobDate());
        assertNull(result.getStartTime());
        assertNull(result.getEndTime());
        assertNull(result.getJobComment());
    }

    @Test
    void convertToJobEntityShouldHandleEmptyValues() {
        // GIVEN
        JobDto jobDto = JobDto.builder()
                .jobFormat("")
                .issuer("")
                .contactPerson("")
                .jobAddress("")
                .jobDate(LocalDate.now())
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(12, 0))
                .jobComment("")
                .build();

        // WHEN
        Job result = jobService.convertToJobEntity(jobDto);

        // THEN
        assertEquals("", result.getJobFormat());
        assertEquals("", result.getIssuer());
        assertEquals("", result.getContactPerson());
        assertEquals("", result.getJobAddress());
        assertEquals(jobDto.getJobDate(), result.getJobDate());
        assertEquals(jobDto.getStartTime(), result.getStartTime());
        assertEquals(jobDto.getEndTime(), result.getEndTime());
        assertEquals("", result.getJobComment());
    }

    @Test
    void findJobById_ThrowsNoSuchElementException() {
        // GIVEN
        String jobId = "nonExistingId";
        when(jobRepo.findById(jobId)).thenReturn(Optional.empty());
        JobService jobService = new JobService(jobRepo, generateUUIDService);

        // WHEN/THEN
        assertThrows(NoSuchElementException.class, () -> jobService.findJobById(jobId));
    }


}
