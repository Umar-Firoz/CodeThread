package com.example.CodeThread.repository;

import com.example.CodeThread.entity.ReviewSessionMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewSessionMemberRepository extends JpaRepository<ReviewSessionMember,Long> {
}
