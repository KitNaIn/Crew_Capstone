package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobDto {
    private String uuid;
    private String jobFormat;
    private String issuer;
    private String contactPerson;
    private String jobAddress;
    private LocalDate jobDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String jobComment;
    private String userStatus;
    private String status;
}

