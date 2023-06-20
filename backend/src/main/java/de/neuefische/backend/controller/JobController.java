package de.neuefische.backend.controller;


import de.neuefische.backend.dto.JobDto;
import de.neuefische.backend.model.Job;
import de.neuefische.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public List<Job> saveJob(@RequestBody JobDto jobDto){
        Job job = jobService.convertToJobEntity(jobDto);
        return jobService.save(job);
    }


}