package com.example.CodeThread.controller;

import com.example.CodeThread.dto.response.DocumentResponseDTO;
import com.example.CodeThread.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/document")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload/{reviewSessionId}")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,@PathVariable Long reviewSessionId) throws IOException {
        return ResponseEntity.ok(documentService.upload(file,reviewSessionId));
    }

    @GetMapping("/{reviewSessionId}/all")
    public ResponseEntity<List<DocumentResponseDTO>> getAll(@PathVariable Long reviewSessionId){
        return ResponseEntity.ok(documentService.getAll(reviewSessionId));
    }

    @GetMapping("/{reviewSessionId}/get/{id}")
    public ResponseEntity<DocumentResponseDTO> get(@PathVariable Long reviewSessionId,@PathVariable Long id){
        return ResponseEntity.ok(documentService.get(reviewSessionId,id));
    }

    @DeleteMapping("/delete/{reviewSessionId}/document/{id}")
    public ResponseEntity<String> delete(@PathVariable Long reviewSessionId,@PathVariable Long id){
        return ResponseEntity.ok(documentService.delete(reviewSessionId,id));
    }

}
