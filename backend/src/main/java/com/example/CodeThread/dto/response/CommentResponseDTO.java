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
    private String comment;
    private Integer lineNumber;
    private boolean resolved;
    private String authorName;
    private Long documentId;
    private LocalDateTime createdAt;

}