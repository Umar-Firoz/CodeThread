package com.example.CodeThread.service;

import com.example.CodeThread.dto.response.DocumentResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DocumentService {
    DocumentResponseDTO upload(MultipartFile file, Long reviewSessionId) throws IOException;
}
