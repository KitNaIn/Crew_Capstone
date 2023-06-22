package de.neuefische.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepo extends MongoRepository<CrewUser, String> {
    Optional<CrewUser>findUserByUsername(String username);
}
