package de.neuefische.backend.security;

import de.neuefische.backend.dto.UserDto;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        UserDto userDto = userService.getUserDetails(username);

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    UserLoginAndRegistrationDTO login() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return new UserLoginAndRegistrationDTO().withUsername(authentication.getName()).withRoles(roles);
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logged out";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto postNewUser(@RequestBody UserLoginAndRegistrationDTO user) {
        return userService.saveUser(user);
    }
}
