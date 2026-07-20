package com.example.CodeThread.websocket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentMessageDTO {
    @NotNull
    private Long reviewSessionId;

    @NotNull
    private Long documentId;

    @NotNull
    private Integer lineNumber;

    @NotBlank
    private String message;
}
