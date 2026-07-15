package com.example.CodeThread.controller;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class ReviewSessionController {

    private final SessionService sessionService;

    @PostMapping("/create")
    public ResponseEntity<ReviewSessionResponseDTO> createSession(@RequestBody ReviewSessionRequestDTO reviewSessionRequestDTO){
       return ResponseEntity.ok(sessionService.createSession(reviewSessionRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewSessionResponseDTO> getSession(@PathVariable Long id){
        return ResponseEntity.ok(sessionService.getSession(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReviewSessionResponseDTO>> getAllSession(){
        return ResponseEntity.ok(sessionService.getAllSession());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id){
        return ResponseEntity.ok(sessionService.deleteSession(id));
    }


}
