package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("CalendarEvent")
@Builder
public class CalendarEvent {
    @Id
    private String uuid;
    private String title;
    private LocalDate eventDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String notes;
}
