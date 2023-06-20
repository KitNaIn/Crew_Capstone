package de.neuefische.backend.repo;

import de.neuefische.backend.model.CalendarEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepo extends MongoRepository<CalendarEvent, String> {
}
