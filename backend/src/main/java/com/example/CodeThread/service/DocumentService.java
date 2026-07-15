package com.example.CodeThread.service;

import com.example.CodeThread.dto.response.DocumentResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    String upload(MultipartFile file, Long reviewSessionId) throws IOException;

    List<DocumentResponseDTO> getAll(Long reviewSessionId);
}
