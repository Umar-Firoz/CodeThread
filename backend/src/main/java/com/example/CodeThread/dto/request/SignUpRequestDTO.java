package com.example.CodeThread.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDTO {
    @NotBlank
    private String name;
    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6, max = 12)
    private String password;
}

