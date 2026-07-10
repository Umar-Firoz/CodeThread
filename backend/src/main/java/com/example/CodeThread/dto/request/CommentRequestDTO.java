package com.example.CodeThread.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDTO {
    @NotBlank
    private String comment;
    @NotBlank
    private Integer lineNumber;
    @NotBlank
    private Long documentId;
}
