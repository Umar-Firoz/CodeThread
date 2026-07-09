package com.example.CodeThread.repository;

import com.example.CodeThread.entity.CodeDocument;
import com.example.CodeThread.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeDocumentRepository extends JpaRepository<CodeDocument, Long> {
}
