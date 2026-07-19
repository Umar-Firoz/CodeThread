package com.example.CodeThread.dto.response;

import com.example.CodeThread.enums.SessionRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSessionMemberResponseDTO {
    private Long id;
    private Long userId;
    private String userName;
    private SessionRole role;
    private LocalDateTime joinedAt;
}
