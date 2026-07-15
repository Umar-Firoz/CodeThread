package com.example.CodeThread.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCommentRequestDTO {

    @NotNull(message = "Line number is required")
    private Integer lineNumber;

    @NotBlank(message = "Comment cannot be empty")
    private String message;
}
