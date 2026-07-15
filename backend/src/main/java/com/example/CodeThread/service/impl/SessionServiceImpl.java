package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.request.ReviewSessionRequestDTO;
import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.User;
import com.example.CodeThread.repository.ReviewSessionRepository;
import com.example.CodeThread.repository.UserRepository;
import com.example.CodeThread.service.SessionService;
import com.example.CodeThread.utils.CurrentUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
    private static final Logger log =
            LoggerFactory.getLogger(SessionServiceImpl.class);
    private final ReviewSessionRepository reviewSessionRepository;
    private final UserRepository userRepository;
    private final CurrentUser currentUser;


    User getCurrentUser()
    {
        return currentUser.getCurrentUser();
    }

    @Override
    @Transactional
    public ReviewSessionResponseDTO createSession(ReviewSessionRequestDTO reviewSessionRequestDTO) {
        ReviewSession reviewSession = new ReviewSession();
        log.info("Creating new session");
        log.debug("Session title received: {}", reviewSessionRequestDTO.getTitle());
        log.debug("Session creator: {}", getCurrentUser().getEmail());
        reviewSession.setTitle(reviewSessionRequestDTO.getTitle());
        reviewSession.setCreatedBy(getCurrentUser());
        log.info("Saving new session");
        ReviewSession session= reviewSessionRepository.save(reviewSession);
        log.info("Session saved with id {}", session.getId());
        return new ReviewSessionResponseDTO(
                  session.getId(),
                session.getTitle(),
                session.getCreatedBy().getName(),
                session.getCreatedAt()
        );
    }

    @Override
    public String deleteSession(Long id) {
        log.info("Deleting session with id {}", id);
        reviewSessionRepository.deleteById(id);
        log.info("Session deleted successfully with id {}", id);
        return "Session deleted";
    }

    @Override
    public ReviewSessionResponseDTO getSession(Long id) {
        log.info("Fetching session with id {}", id);
        ReviewSession reviewSession = reviewSessionRepository.findById(id).
                orElseThrow(()->new RuntimeException("Session not found"));
        log.debug("Session found with title {}", reviewSession.getTitle());
        return new ReviewSessionResponseDTO(
                reviewSession.getId(),
                reviewSession.getTitle(),
                reviewSession.getCreatedBy().getName(),
                reviewSession.getCreatedAt()
        );
    }

    @Override
    public List<ReviewSessionResponseDTO> getAllSession() {
        log.info("Fetching all sessions for user {}", getCurrentUser().getEmail());
        return  reviewSessionRepository.findByCreatedBy(getCurrentUser())
                .stream()
                .map(session -> new ReviewSessionResponseDTO(
                        session.getId(),
                        session.getTitle(),
                        session.getCreatedBy().getName(),
                        session.getCreatedAt()
                )).toList();
    }




    // 4 function. get user form current user
//    createSession() done
//    getSessionById() done
//    getMySessions()   done
//    deleteSession() done




}
