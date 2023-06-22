package de.neuefische.backend.security;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@With
@Document("users")
public class CrewUser {
    private String id;
    private String username;
    private String password;
    private List<SimpleGrantedAuthority> roles;
}
