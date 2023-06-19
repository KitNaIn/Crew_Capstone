package de.neuefische.backend.model;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class JobTest {

    @Test
    public void testJobModel() {
       //GIVEN
        String uuid = "12345";
        String jobFormat = "Test Format";
        String issuer = "Test Issuer";
        String contactPerson = "Test Contact Person";
        String jobAddress = "Test Address";
        LocalDate jobDate = LocalDate.now();
        LocalTime startTime = LocalTime.of(9, 0);
        LocalTime endTime = LocalTime.of(17, 0);
        String status = "Test Status";
        String jobComment = "Test Comment";

        Job job = new Job(uuid, jobFormat, issuer, contactPerson, jobAddress, jobDate, startTime, endTime, status, jobComment);
        // WHEN
        assertEquals(uuid, job.getUuid());
        assertEquals(jobFormat, job.getJobFormat());
        assertEquals(issuer, job.getIssuer());
        assertEquals(contactPerson, job.getContactPerson());
        assertEquals(jobAddress, job.getJobAddress());
        assertEquals(jobDate, job.getJobDate());
        assertEquals(startTime, job.getStartTime());
        assertEquals(endTime, job.getEndTime());
        assertEquals(status, job.getStatus());
        assertEquals(jobComment, job.getJobComment());
        // THEN
        String newUuid = "54321";
        job.setUuid(newUuid);
        assertEquals(newUuid, job.getUuid());

        String newJobFormat = "New Format";
        job.setJobFormat(newJobFormat);
        assertEquals(newJobFormat, job.getJobFormat());

        String newIssuer = "New Issuer";
        job.setIssuer(newIssuer);
        assertEquals(newIssuer, job.getIssuer());

        String newContactPerson = "New Contact Person";
        job.setContactPerson(newContactPerson);
        assertEquals(newContactPerson, job.getContactPerson());

        String newJobAddress = "New Address";
        job.setJobAddress(newJobAddress);
        assertEquals(newJobAddress, job.getJobAddress());

        LocalDate newJobDate = LocalDate.of(2023, 6, 19);
        job.setJobDate(newJobDate);
        assertEquals(newJobDate, job.getJobDate());

        LocalTime newStartTime = LocalTime.of(8, 0);
        job.setStartTime(newStartTime);
        assertEquals(newStartTime, job.getStartTime());

        LocalTime newEndTime = LocalTime.of(16, 0);
        job.setEndTime(newEndTime);
        assertEquals(newEndTime, job.getEndTime());

        String newStatus = "New Status";
        job.setStatus(newStatus);
        assertEquals(newStatus, job.getStatus());

        String newJobComment = "New Comment";
        job.setJobComment(newJobComment);
        assertEquals(newJobComment, job.getJobComment());
    }
    @Test
    public void testNoArgsConstructor() {
        //GIVEN
        Job job = new Job();
        //THEN
        assertEquals(null, job.getJobDate());
    }
    @Test
    public void testNoArgsConstructorSetter() {
        //GIVEN
        Job job = new Job();
        //WHEN
        job.setIssuer("Issuer");
        //THEN
        assertEquals("Issuer", job.getIssuer());
    }


}