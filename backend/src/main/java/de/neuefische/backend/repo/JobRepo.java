package de.neuefische.backend.repo;

import de.neuefische.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepo extends MongoRepository <Job, String> {
}