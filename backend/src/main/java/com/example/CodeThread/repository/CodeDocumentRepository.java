package com.example.CodeThread.repository;

import com.example.CodeThread.dto.response.DocumentResponseDTO;
import com.example.CodeThread.entity.CodeDocument;
import com.example.CodeThread.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CodeDocumentRepository extends JpaRepository<CodeDocument, Long> {
    List<CodeDocument> findByReviewSessionId(Long reviewSessionId);

    Optional<CodeDocument> findByReviewSessionIdAndId(Long reviewSessionId, Long id);
}
