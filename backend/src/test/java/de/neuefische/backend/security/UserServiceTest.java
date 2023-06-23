package de.neuefische.backend.security;

import de.neuefische.backend.service.GenerateUUIDService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

class UserServiceTest {
    @Mock
    private UserRepo userRepo;

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private GenerateUUIDService generateUUIDService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepo,passwordEncoder, generateUUIDService );
    }

}