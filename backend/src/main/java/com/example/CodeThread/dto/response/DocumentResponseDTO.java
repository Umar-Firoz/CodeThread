package com.example.CodeThread.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponseDTO {

    private Long id;
    private String fileName;
    private String language;
    private String content;
    private String uploadedBy;
    private Long reviewSessionId;
    private LocalDateTime createdAt;

}