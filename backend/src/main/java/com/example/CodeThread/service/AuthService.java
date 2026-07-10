package com.example.CodeThread.service;

import com.example.CodeThread.dto.request.LogInRequestDTO;
import com.example.CodeThread.dto.request.SignUpRequestDTO;
import com.example.CodeThread.dto.response.ApiResponseDTO;
import com.example.CodeThread.dto.response.AuthResponseDTO;

public interface AuthService {
    ApiResponseDTO signUp(SignUpRequestDTO signUpRequestDTO);
    AuthResponseDTO logIn(LogInRequestDTO logInRequestDTO);
}
