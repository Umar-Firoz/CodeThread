package com.example.CodeThread.websocket.controller;

import com.example.CodeThread.dto.request.CreateCommentRequestDTO;
import com.example.CodeThread.dto.response.CommentResponseDTO;
import com.example.CodeThread.service.CommentService;
import com.example.CodeThread.websocket.dto.CommentMessageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
@RequiredArgsConstructor
public class CommentSocketController {

    private final CommentService commentService;
    private final SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/comments")
    public void sendComment(@Valid CommentMessageDTO dto) {
        CreateCommentRequestDTO request = new CreateCommentRequestDTO(dto.getLineNumber(), dto.getMessage());
        CommentResponseDTO response = commentService.create(dto.getReviewSessionId(), dto.getDocumentId(), request);
        messagingTemplate.convertAndSend("/topic/review/" + dto.getReviewSessionId() + "/comments", response);
    }
}