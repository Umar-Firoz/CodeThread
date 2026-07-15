package com.example.CodeThread.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDTO {
    private Long id;
    private Integer lineNumber;
    private String message;
    private String authorName;
    private LocalDateTime createdAt;
}