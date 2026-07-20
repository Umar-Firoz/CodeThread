package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.request.CreateCommentRequestDTO;
import com.example.CodeThread.dto.response.CommentResponseDTO;
import com.example.CodeThread.entity.CodeDocument;
import com.example.CodeThread.entity.Comment;
import com.example.CodeThread.repository.CodeDocumentRepository;
import com.example.CodeThread.repository.CommentRepository;
import com.example.CodeThread.service.PermissionService;
import com.example.CodeThread.utils.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import com.example.CodeThread.service.CommentService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CodeDocumentRepository codeDocumentRepository;
    private final CurrentUser currentUser;
    private final PermissionService permissionService;

    @Override
    public CommentResponseDTO create(Long reviewSessionId,
                                     Long documentId,
                                     CreateCommentRequestDTO request) {
        permissionService.checkMember(reviewSessionId); // this will check wheather iuser has acees to add \or not

        log.info("Creating comment for doc {}", documentId);

        CodeDocument document = codeDocumentRepository
                .findByReviewSessionIdAndId(reviewSessionId, documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        Comment comment = new Comment();
        comment.setMessage(request.getMessage());
        comment.setLineNumber(request.getLineNumber());
        comment.setDocument(document);
        comment.setAuthor(currentUser.getCurrentUser());

        commentRepository.save(comment);

        return new CommentResponseDTO(
                comment.getId(),
                comment.getLineNumber(),
                comment.getMessage(),
                comment.getAuthor().getName(),
                comment.getCreatedAt()
        );
    }

    @Override
    public List<CommentResponseDTO> getAll(Long reviewSessionId,
                                           Long documentId) {
        permissionService.checkMember(reviewSessionId);
        log.info("Getting comments for doc {}", documentId);
        return commentRepository
                .findByDocumentReviewSessionIdAndDocumentId(reviewSessionId, documentId)
                .stream()
                .map(comment -> new CommentResponseDTO(
                        comment.getId(),
                        comment.getLineNumber(),
                        comment.getMessage(),
                        comment.getAuthor().getName(),
                        comment.getCreatedAt()
                ))
                .toList();
    }

//    @Override
//    public CommentResponseDTO update(Long commentId,
//                                     UpdateCommentRequestDTO request) {
//
//        log.info("Updating comment {}", commentId);
//
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new RuntimeException("Comment not found"));
//
//        comment.setMessage(request.getMessage());
//
//        commentRepository.save(comment);
//
//        return new CommentResponseDTO(
//                comment.getId(),
//                comment.getLineNumber(),
//                comment.getMessage(),
//                comment.getAuthor().getName(),
//                comment.getCreatedAt()
//        );
//    }

    @Override
    public String delete(Long commentId,Long reviewSessionId) {
        permissionService.checkMember(reviewSessionId);
        log.info("Deleting comment {}", commentId);
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
        return "Comment deleted";
    }
}
