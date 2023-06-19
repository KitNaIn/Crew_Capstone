package de.neuefische.backend.repo;

import de.neuefische.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JobRepo extends MongoRepository <Job, String> {



}