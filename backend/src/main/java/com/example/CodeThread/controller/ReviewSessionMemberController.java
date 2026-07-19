package com.example.CodeThread.controller;

import com.example.CodeThread.dto.response.ReviewSessionMemberResponseDTO;
import com.example.CodeThread.service.ReviewSessionMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review-members")
@RequiredArgsConstructor
public class ReviewSessionMemberController {

    private final ReviewSessionMemberService reviewSessionMemberService;

    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<String> joinSession(@PathVariable String inviteCode) {
        return ResponseEntity.ok(reviewSessionMemberService.joinSession(inviteCode));
    }

    @GetMapping("/{reviewSessionId}")
    public ResponseEntity<List<ReviewSessionMemberResponseDTO>> getAllMembers(@PathVariable Long reviewSessionId) {
        return ResponseEntity.ok(reviewSessionMemberService.getAllMembers(reviewSessionId));
    }
}