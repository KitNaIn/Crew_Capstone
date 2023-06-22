package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
public class UserLoginAndRegistrationDTO {
    private String username;
    private String password;
    private List<String> roles;
}
