package com.example.CodeThread.repository;

import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewSessionRepository extends JpaRepository<ReviewSession, Long> {
}
