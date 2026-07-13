package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.User;
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
    User getCurrentUser()
    {
        return currentUser.getCurrentUser();
    }

    @Override
    public ReviewSessionResponseDTO createSession(ReviewSessionRequestDTO reviewSessionRequestDTO) {
        ReviewSession reviewSession = new ReviewSession();
        reviewSession.setTitle(reviewSessionRequestDTO.getTitle());
        reviewSession.setCreatedBy(getCurrentUser());
        reviewSessionRepository.save(reviewSession);
        return new ReviewSessionResponseDTO(
                    "Session created",
                true
        );
    }

    @Override
    public String deleteSession(Long id) {
        reviewSessionRepository.deleteById(id);
        return "Session deleted";
    }

    // 4 function. get user form current user
//    createSession()
//    getSessionById()
//    getMySessions()
//    deleteSession()




}
