package com.example.CodeThread.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequestDTO {
    @NotBlank
    private String fileName;
    @NotBlank
    private String language;
    @NotBlank
    private String content;
    @NotBlank
    private Long reviewSessionId;
}
