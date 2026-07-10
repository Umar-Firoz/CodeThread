package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.request.LogInRequestDTO;
import com.example.CodeThread.dto.request.SignUpRequestDTO;
import com.example.CodeThread.dto.response.ApiResponseDTO;
import com.example.CodeThread.dto.response.AuthResponseDTO;
import com.example.CodeThread.entity.User;
import com.example.CodeThread.repository.UserRepository;
import com.example.CodeThread.security.JwtUtil;
import com.example.CodeThread.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private static final Logger log =
            LoggerFactory.getLogger(AuthServiceImpl.class);

    @Override
    public ApiResponseDTO signUp(SignUpRequestDTO signUpRequestDTO) {
        if(userRepository.existsByEmail(signUpRequestDTO.getEmail())){
            throw new RuntimeException("Email already exist");
        }
        log.info("No prev user exist with this {} email. Moving to create new user{}", signUpRequestDTO.getEmail());
        User user = new User();
        user.setEmail(signUpRequestDTO.getEmail());
        user.setName(signUpRequestDTO.getName());
        user.setPassword(passwordEncoder.encode(signUpRequestDTO.getPassword()));
        log.info("Saving user {} ", user);
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with email {} ", savedUser.getEmail());
        return new ApiResponseDTO(
                "Account created with email " + savedUser.getEmail(),
                true
        );
    }

    @Override
    public AuthResponseDTO logIn(LogInRequestDTO logInRequestDTO) {
        log.info("Login attempt for email: {}", logInRequestDTO.getEmail());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                logInRequestDTO.getEmail(),
                logInRequestDTO.getPassword()
        ));
        log.info("Authentication successful for email: {} ", logInRequestDTO.getEmail());
        User user=userRepository.findByEmail(logInRequestDTO.getEmail())
                .orElseThrow(()->new RuntimeException("No account found with this email"));

        String token= jwtUtil.generateToken(logInRequestDTO.getEmail());
        log.info("JWT token generated for email: {} ", logInRequestDTO.getEmail());
        return new AuthResponseDTO(
                token,
                user.getEmail()
        );
    }


}
