package com.example.CodeThread.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSessionResponseDTO {

        private Long id;
        private String title;
        private String createdBy;
        private LocalDateTime createdAt;
}
