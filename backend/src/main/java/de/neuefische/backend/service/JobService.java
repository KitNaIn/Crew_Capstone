package de.neuefische.backend.service;

import de.neuefische.backend.model.Job;
import de.neuefische.backend.repo.JobRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepo jobRepo;
    private final GenerateUUIDService generateUUIDService;

    public List<Job> findAll() {
        return jobRepo.findAll();
    }
    public List<Job> save(Job job) {
        Job newJob = Job.builder()
                .uuid(generateUUIDService.generateUUID())
                .jobFormat(job.getJobFormat())
                .issuer(job.getIssuer())
                .contactPerson(job.getContactPerson())
                .jobAddress(job.getJobAddress())
                .jobDate(job.getJobDate())
                .startTime(job.getStartTime())
                .endTime(job.getEndTime())
                .status(job.getStatus())
                .jobComment(job.getJobComment())
                .build();

        jobRepo.save(newJob);
        return findAll();
    }

    public List<Job> getAllJobsSortedByDateTime() {
        List<Job> allJobs = jobRepo.findAll();
        allJobs.sort((job1, job2) -> {
            int dateComparison = job1.getJobDate().compareTo(job2.getJobDate());
            if (dateComparison == 0) {
                return job1.getStartTime().compareTo(job2.getStartTime());
            }
            return dateComparison;
        });
        return allJobs;
    }

}