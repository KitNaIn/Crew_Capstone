package de.neuefische.backend.controller;

import de.neuefische.backend.dto.JobDto;
import de.neuefische.backend.model.Job;
import de.neuefische.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<Job> saveJob(@RequestBody JobDto jobDto) {
        Job job = jobService.convertToJobEntity(jobDto);
        return jobService.save(job);
    }

    @GetMapping("/sorted")
    public List<Job> getAllJobsSortedByDateTime() {
        return jobService.getAllJobsSortedByDateTime();
    }

    @GetMapping("/{id}")
    public Job getJobById(@PathVariable String id) {
        return jobService.findJobById(id);
    }
    @PutMapping("/{id}/accept")
    public ResponseEntity<Void> acceptJob(@PathVariable String id) {
        try {
            jobService.acceptJob(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectJob(@PathVariable String id) {
        try {
            jobService.rejectJob(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/{id}")
    public Job updateJob(@PathVariable String id, @RequestBody JobDto job) {
        Job updatedJob = Job.builder()
                .jobFormat(job.getJobFormat())
                .issuer(job.getIssuer())
                .contactPerson(job.getContactPerson())
                .jobAddress(job.getJobAddress())
                .jobDate(job.getJobDate())
                .startTime(job.getStartTime())
                .endTime(job.getEndTime())
                .jobComment(job.getJobComment())
                .build();
        return jobService.updateJob(id, updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        try {
            jobService.deleteJobById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
