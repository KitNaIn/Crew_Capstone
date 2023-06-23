package de.neuefische.backend.security;


import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
import de.neuefische.backend.service.GenerateUUIDService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final GenerateUUIDService generateUUIDService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CrewUser crewUser = userRepo.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));
        return new User(crewUser.getUsername(), crewUser.getPassword(), crewUser.getRoles());
    }

    public UserDto saveUser(UserLoginAndRegistrationDTO user) {
        CrewUser newUser = CrewUser.builder()
                .id(generateUUIDService.generateUUID())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();

        if (userRepo.findUserByUsername(newUser.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with username " + user.getUsername() + " already exists");
        }
        CrewUser temporalUser = userRepo.save(newUser.withRoles(Collections.singletonList(new SimpleGrantedAuthority("user"))).withPassword(passwordEncoder.encode(user.getPassword())));
        List<String> roles = temporalUser.getRoles().stream().map(SimpleGrantedAuthority::toString).toList();
        return new UserDto(temporalUser.getId(), temporalUser.getUsername(), roles);
    }

    public UserDto getUserDetails(String username) {
        CrewUser crewUser = userRepo.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));

        List<String> roles = crewUser.getRoles().stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new UserDto(crewUser.getId(), crewUser.getUsername(), roles);
    }
}
