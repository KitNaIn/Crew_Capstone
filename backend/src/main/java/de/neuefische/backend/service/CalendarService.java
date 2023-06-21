package de.neuefische.backend.service;

import de.neuefische.backend.model.CalendarEvent;
import de.neuefische.backend.repo.CalendarRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepo calendarRepo;


    public List<CalendarEvent> findAll() {
        return calendarRepo.findAll();
    }

}
