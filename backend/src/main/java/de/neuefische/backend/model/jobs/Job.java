package de.neuefische.backend.model.jobs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Job")
@Builder
public class Job {
    @Id
    @Field("id")
    private String uuid;
    private String jobFormat;
    private String issuer;
    private String contactPerson;
    private String jobAddress;
    private LocalDate jobDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String jobComment;
}
