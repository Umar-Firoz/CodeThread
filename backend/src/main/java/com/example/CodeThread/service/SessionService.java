package com.example.CodeThread.service;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;

import java.util.List;

public interface SessionService {
    ReviewSessionResponseDTO createSession(ReviewSessionRequestDTO reviewSessionRequestDTO);
    String deleteSession(Long id);

    ReviewSessionResponseDTO getSession(Long id);

    List<ReviewSessionResponseDTO> getAllSession();
}
