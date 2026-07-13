package com.example.CodeThread.controller;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class ReviewSessionController {

    private final SessionService sessionService;

    @PostMapping("/create")
    ResponseEntity<ReviewSessionResponseDTO> createSession(@RequestBody ReviewSessionRequestDTO reviewSessionRequestDTO){
       return ResponseEntity.ok(sessionService.createSession(reviewSessionRequestDTO));
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteSession(@PathVariable Long id){
        return ResponseEntity.ok(sessionService.deleteSession(id));
    }
}
