package com.example.CodeThread.service;

import com.example.CodeThread.dto.request.CreateCommentRequestDTO;
import com.example.CodeThread.dto.response.CommentResponseDTO;

import java.util.List;

public interface CommentService {

    CommentResponseDTO create(Long reviewSessionId, Long documentId, CreateCommentRequestDTO request);
    List<CommentResponseDTO> getAll(Long reviewSessionId, Long documentId);
    String delete(Long commentId);
}