package com.example.CodeThread.service.impl;

import com.example.CodeThread.entity.ReviewSessionMember;
import com.example.CodeThread.entity.User;
import com.example.CodeThread.enums.SessionRole;
import com.example.CodeThread.repository.ReviewSessionMemberRepository;
import com.example.CodeThread.service.PermissionService;
import com.example.CodeThread.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    private final ReviewSessionMemberRepository reviewSessionMemberRepository;
    private final CurrentUser currentUser;
    private static final Logger log = LoggerFactory.getLogger(PermissionServiceImpl.class);

    User getCurrentUser() {
        return currentUser.getCurrentUser();
    }

    @Override
    public void checkMember(Long reviewSessionId) {
        boolean exist=reviewSessionMemberRepository.existsByReviewSessionIdAndUserId(reviewSessionId,getCurrentUser().getId());
        log.info("Checking member permission for review session {}", reviewSessionId);
        if(!exist){
            throw new RuntimeException("You are not the member");
        }
    }

    @Override
    public void checkAdmin(Long reviewSessionId) {
        ReviewSessionMember reviewSessionMember=reviewSessionMemberRepository.findByReviewSessionIdAndUserId(reviewSessionId,getCurrentUser().getId())
                .orElseThrow(()-> new RuntimeException("You are not the member"));
        log.info("Checking admin permission for review session {}", reviewSessionId);
        if (reviewSessionMember.getRole() != SessionRole.ADMIN){
            throw new RuntimeException("You are not the ADMIN");
        }
    }
}
