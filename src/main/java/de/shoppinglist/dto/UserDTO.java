package de.shoppinglist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String token;
    private Set<RoleDTO> roles;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoggedIn;
    @ToString.Exclude
    private byte[] avatar;
    @ToString.Exclude
    private String avatarBase64;

}
