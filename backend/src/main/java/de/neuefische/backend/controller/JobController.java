package de.neuefische.backend.controller;

import de.neuefische.backend.model.Job;
import de.neuefische.backend.repo.JobRepo;
import de.neuefische.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")


public class JobController {
    private final JobService jobService;
    private final JobRepo jobRepo;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.findAll();
    }
    @GetMapping("/sorted")
    public List<Job> getAllJobsSortedByDateTime() {
        return jobService.getAllJobsSortedByDateTime();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<Job> saveJob(@RequestBody Job job){
        return jobService.save(job);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateJobStatus(@PathVariable String id, @RequestBody String status) {
        try {
            Job job = jobRepo.findById(id)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);
            job.setStatus(status);
            jobRepo.save(job);

            return ResponseEntity.ok().build();
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable String id) {
        try {
            jobRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}