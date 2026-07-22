package com.example.CodeThread.controller;

import com.example.CodeThread.dto.request.LogInRequestDTO;
import com.example.CodeThread.dto.request.SignUpRequestDTO;
import com.example.CodeThread.dto.response.ApiResponseDTO;
import com.example.CodeThread.dto.response.AuthResponseDTO;
import com.example.CodeThread.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(
        origins = {
                "http://localhost:5173"
        }
)
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDTO> signUp(@Valid @RequestBody SignUpRequestDTO signUpRequestDTO){
        return ResponseEntity.ok(authService.signUp(signUpRequestDTO));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> logIn(@Valid @RequestBody LogInRequestDTO logInRequestDTO){
        return ResponseEntity.ok(authService.logIn(logInRequestDTO));
    }

}
