package com.example.CodeThread.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequestDTO {
    private String fileName;
    private String language;
    private String content;
    private Long reviewSessionId;
}
