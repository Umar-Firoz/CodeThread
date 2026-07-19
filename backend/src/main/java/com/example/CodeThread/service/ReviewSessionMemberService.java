package com.example.CodeThread.service;

import com.example.CodeThread.dto.response.ReviewSessionMemberResponseDTO;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.ReviewSessionMember;
import com.example.CodeThread.entity.User;

import java.util.List;

public interface ReviewSessionMemberService {
    String joinSession(String inviteCode);
    void addAdminMember(ReviewSession reviewSession, User user);
    List<ReviewSessionMemberResponseDTO> getAllMembers(Long reviewSessionId);
}
