package com.example.CodeThread.dto.response;

import com.example.CodeThread.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String type;
    private String email;
    private Role role;
}