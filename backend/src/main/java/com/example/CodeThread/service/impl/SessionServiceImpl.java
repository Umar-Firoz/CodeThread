package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.repository.ReviewSessionRepository;
import com.example.CodeThread.repository.UserRepository;
import com.example.CodeThread.service.SessionService;
import com.example.CodeThread.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
    private final ReviewSessionRepository reviewSessionRepository;
    private final UserRepository userRepository;
    private final CurrentUser currentUser;

    @Override
    public ReviewSessionResponseDTO createSession(ReviewSessionRequestDTO reviewSessionRequestDTO) {
        return null;
    }

    // 4 function. get user form current user
//    createSession()
//    getSessionById()
//    getMySessions()
//    deleteSession()




}
