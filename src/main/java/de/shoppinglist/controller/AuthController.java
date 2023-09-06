package de.shoppinglist.controller;

import de.shoppinglist.config.UserAuthenticationProvider;
import de.shoppinglist.dto.LoginDto;
import de.shoppinglist.dto.RegisterDto;
import de.shoppinglist.entity.User;
import de.shoppinglist.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@AllArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthController {
    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    /**
     * Login: Dabei wird ein Token fuer die Authentifizierung erstellt
     *
     * @param loginDto LoginDaten
     * @return eingeloggter User mit Token
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@Valid @RequestBody LoginDto loginDto) {
        User user = userService.login(loginDto);
        user.setToken(userAuthenticationProvider.createToken(user));

        return ResponseEntity.ok(user);
    }

    /**
     * Register: Dabei wird ein Token fuer die Authentifizierung erstellt
     *
     * @param registerDto Registrierungsdaten
     * @return eingeloggter User mit Token
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterDto registerDto) {
        User createdUser = userService.register(registerDto);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }
}