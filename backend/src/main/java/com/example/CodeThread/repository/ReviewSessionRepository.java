package com.example.CodeThread.repository;

import com.example.CodeThread.dto.response.ReviewSessionResponseDTO;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewSessionRepository extends JpaRepository<ReviewSession, Long> {
    List<ReviewSession> findByCreatedBy(User user);

    Optional<ReviewSession> findByInviteCode(String inviteCode);
}
