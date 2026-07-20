package com.example.CodeThread.controller;


import com.example.CodeThread.dto.request.CreateCommentRequestDTO;
import com.example.CodeThread.dto.response.CommentResponseDTO;
import com.example.CodeThread.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/reviews/{reviewId}/documents/{documentId}")
    public ResponseEntity<CommentResponseDTO> create(@PathVariable Long reviewId, @PathVariable Long documentId, @Valid @RequestBody CreateCommentRequestDTO request
    ) {
        return ResponseEntity.ok(commentService.create(reviewId, documentId, request));
    }

    @GetMapping("/reviews/{reviewId}/documents/{documentId}")
    public ResponseEntity<List<CommentResponseDTO>> getAll(@PathVariable Long reviewId, @PathVariable Long documentId) {
        return ResponseEntity.ok(
                commentService.getAll(reviewId, documentId)
        );
    }

//    @PutMapping("/{commentId}")
//    public ResponseEntity<CommentResponseDTO> update(
//            @PathVariable Long commentId,
//            @Valid @RequestBody UpdateCommentRequestDTO request
//    ) {
//        return ResponseEntity.ok(
//                commentService.update(
//                        commentId,
//                        request
//                )
//        );
//    }

    @DeleteMapping("/{reviewSessionId}/{commentId}")
    public ResponseEntity<String> delete(@PathVariable Long commentId, @PathVariable Long reviewSessionId) {
        return ResponseEntity.ok(commentService.delete(commentId,reviewSessionId));
    }
}
