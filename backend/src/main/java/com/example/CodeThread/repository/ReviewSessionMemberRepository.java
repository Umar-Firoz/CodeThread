package com.example.CodeThread.repository;

import com.example.CodeThread.entity.ReviewSessionMember;
import com.example.CodeThread.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewSessionMemberRepository extends JpaRepository<ReviewSessionMember,Long> {
   Optional<ReviewSessionMember>  findByUser(User currentUser);

    boolean existsByReviewSessionIdAndUserId(Long id, Long id1);

    List<ReviewSessionMember> findByReviewSessionId(Long reviewSessionId);

    Optional<ReviewSessionMember> findByReviewSessionIdAndUserId(Long reviewSessionId, Long id);
}
