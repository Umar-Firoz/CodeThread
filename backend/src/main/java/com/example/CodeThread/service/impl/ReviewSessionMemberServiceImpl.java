package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.response.ReviewSessionMemberResponseDTO;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.entity.ReviewSessionMember;
import com.example.CodeThread.entity.User;
import com.example.CodeThread.enums.SessionRole;
import com.example.CodeThread.repository.ReviewSessionMemberRepository;
import com.example.CodeThread.repository.ReviewSessionRepository;
import com.example.CodeThread.service.ReviewSessionMemberService;
import com.example.CodeThread.utils.CurrentUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewSessionMemberServiceImpl implements ReviewSessionMemberService {

    private final ReviewSessionMemberRepository reviewSessionMemberRepository;
    private final ReviewSessionRepository reviewSessionRepository;
    private final CurrentUser currentUser;
    private static final Logger log = LoggerFactory.getLogger(ReviewSessionMemberServiceImpl.class);

    User getCurrentUser() {
        return currentUser.getCurrentUser();
    }

    @Override
    @Transactional
    public String joinSession(String inviteCode) {
        ReviewSession reviewSession = reviewSessionRepository.findByInviteCode(inviteCode)
                .orElseThrow(()->new RuntimeException("Invalid Session Code"));
        //use optional to use orElseTHrow
        if (reviewSessionMemberRepository.existsByReviewSessionIdAndUserId(reviewSession.getId(), getCurrentUser().getId())) {
            throw new RuntimeException("Already a member of this session");
        }
        ReviewSessionMember reviewSessionMember = new ReviewSessionMember();
        reviewSessionMember.setUser(getCurrentUser());
        reviewSessionMember.setReviewSession(reviewSession);
        reviewSessionMember.setRole(SessionRole.MEMBER);
        reviewSessionMemberRepository.save(reviewSessionMember);
        return "Joined Session";
    }

    @Override
    public void addAdminMember(ReviewSession reviewSession, User user) {
        ReviewSessionMember reviewSessionMember = new ReviewSessionMember();
        reviewSessionMember.setReviewSession(reviewSession);
        reviewSessionMember.setUser(user);
        reviewSessionMember.setRole(SessionRole.ADMIN);
        reviewSessionMemberRepository.save(reviewSessionMember);
    }

    @Override
    public List<ReviewSessionMemberResponseDTO> getAllMembers(Long reviewSessionId) {
        List<ReviewSessionMember> members = reviewSessionMemberRepository.findByReviewSessionId((reviewSessionId));

        return members.stream()
                .map(member -> new ReviewSessionMemberResponseDTO(
                        member.getId(),
                        member.getUser().getId(),
                        member.getUser().getName(),
                        member.getRole(),
                        member.getCreatedAt()
                ))
                .toList();
    }


}
