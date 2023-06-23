package de.neuefische.backend.security;

import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.service.GenerateUUIDService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class UserServiceTest {
    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private GenerateUUIDService generateUUIDService;

    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepo, passwordEncoder, generateUUIDService);
    }

    @Test
    void loadUserByUsername() {
        //GIVEN
        String userName = "Test";
        String password = "password";
        List<String> roles = Collections.singletonList("ROLE_USER");

        CrewUser crewUser = new CrewUser();
        crewUser.setUsername(userName);
        crewUser.setPassword(password);
        crewUser.setRoles(roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));
        //WHEN
        when(userRepo.findUserByUsername(userName)).thenReturn(Optional.of(crewUser));
        UserDetails result = userService.loadUserByUsername(userName);
        //THEN
        assertEquals(userName, result.getUsername());
        assertEquals(password, result.getPassword());
        assertEquals(1, result.getAuthorities().size());
        assertEquals("ROLE_USER", result.getAuthorities().iterator().next().getAuthority());
    }

    @Test
    void getUserDetails() {
        //GIVEN
        String userName = "Test";
        String userId = "123";
        List<String> roles = Collections.singletonList("ROLE_USER");
        //WHEN
        CrewUser crewUser = new CrewUser();
        crewUser.setId(userId);
        crewUser.setUsername(userName);
        crewUser.setRoles(roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));

        when(userRepo.findUserByUsername(userName)).thenReturn(Optional.of(crewUser));

        UserDto result = userService.getUserDetails(userName);
        //THEN
        assertEquals(userId, result.getId());
        assertEquals(userName, result.getUsername());
        assertEquals(roles, result.getRoles());
    }

    @Test
    void getUserDetails_whenUserExists_shouldReturnUserDto() {
        //GIVEN
        String userName = "Test";
        String userId = "123";
        List<String> roles = Collections.singletonList("ROLE_USER");

        CrewUser crewUser = new CrewUser();
        crewUser.setId(userId);
        crewUser.setUsername(userName);
        crewUser.setRoles(roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));

        when(userRepo.findUserByUsername(userName)).thenReturn(Optional.of(crewUser));

        //WHEN
        UserDto result = userService.getUserDetails(userName);

        //THEN
        assertEquals(userId, result.getId());
        assertEquals(userName, result.getUsername());
        assertEquals(roles, result.getRoles());
    }

    @Test
    void getUserDetails_whenUserDoesNotExist_shouldThrowException() {
        //GIVEN
        String userName = "NonExistingUser";

        when(userRepo.findUserByUsername(userName)).thenReturn(Optional.empty());

        //WHEN&THEN
        assertThrows(UsernameNotFoundException.class, () -> userService.getUserDetails(userName));
    }
}
