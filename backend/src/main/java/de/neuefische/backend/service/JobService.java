package de.neuefische.backend.service;

import de.neuefische.backend.dto.JobDto;
import de.neuefische.backend.model.Job;
import de.neuefische.backend.repo.JobRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public Job convertToJobEntity(JobDto jobDto) {
        return Job.builder()
                .jobFormat(jobDto.getJobFormat())
                .issuer(jobDto.getIssuer())
                .contactPerson(jobDto.getContactPerson())
                .jobAddress(jobDto.getJobAddress())
                .jobDate(jobDto.getJobDate())
                .startTime(jobDto.getStartTime())
                .endTime(jobDto.getEndTime())
                .jobComment(jobDto.getJobComment())
                .build();
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

    public Job findJobById(String id) {
        return jobRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Job with id " + id + " does not exist"));
    }
    public Job updateJob(String id, Job job) {
        Job jobToUpdate = findJobById(id);
        jobToUpdate.setJobFormat(job.getJobFormat());
        jobToUpdate.setIssuer(job.getIssuer());
        jobToUpdate.setContactPerson(job.getContactPerson());
        jobToUpdate.setJobAddress(job.getJobAddress());
        jobToUpdate.setJobDate(job.getJobDate());
        jobToUpdate.setStartTime(job.getStartTime());
        jobToUpdate.setEndTime(job.getEndTime());
        jobToUpdate.setJobComment(job.getJobComment());
        return jobRepo.save(jobToUpdate);
    }

    public void deleteJobById(String id) {
        jobRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Job with id " + id + " does not exist"));
        jobRepo.deleteById(id);
    }


}
