package com.example.CodeThread.service.impl;

import com.example.CodeThread.dto.response.DocumentResponseDTO;
import com.example.CodeThread.entity.CodeDocument;
import com.example.CodeThread.entity.ReviewSession;
import com.example.CodeThread.repository.CodeDocumentRepository;
import com.example.CodeThread.repository.ReviewSessionRepository;
import com.example.CodeThread.service.DocumentService;
import com.example.CodeThread.utils.CurrentUser;
import com.example.CodeThread.utils.LanguageDetector;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final CodeDocumentRepository codeDocumentRepository;
    private final ReviewSessionRepository reviewSessionRepository;
    private final LanguageDetector languageDetector;
    private final CurrentUser currentUser;
    private static final Logger log = LoggerFactory.getLogger(DocumentServiceImpl.class);




    @Override
    @Transactional
    public String upload(MultipartFile file, Long reviewSessionId) throws IOException {
        log.info("Starting zip upload for review session {}", reviewSessionId);
        ReviewSession reviewSession = reviewSessionRepository.findById(reviewSessionId).orElseThrow(()->new RuntimeException("review session not found"));
        log.debug("Review session found {}", reviewSession.getId());
        try(ZipInputStream zis=new ZipInputStream(file.getInputStream())){
            ZipEntry entry;
            while((entry=zis.getNextEntry())!=null){
                if(entry.isDirectory()){continue;}
                String fileName = entry.getName();
                log.debug("Checking file {}", fileName);
                if(!languageDetector.isSupportedFile(fileName)){
                    continue;
                }
                ByteArrayOutputStream outputStream =new ByteArrayOutputStream();
                byte[] buffer=new byte[1024];
                int len;
                while((len=zis.read(buffer))!=-1){
                    outputStream.write(buffer,0,len);
                }

                String content = outputStream.toString(StandardCharsets.UTF_8);

                if (content.contains("\0")) {
                    log.warn("Skipping binary file: {}", fileName);
                    continue;
                }

                CodeDocument codeDocument = new CodeDocument();
                codeDocument.setContent(content);
                codeDocument.setFileName(fileName);
                codeDocument.setReviewSession(reviewSession);
                codeDocument.setLanguage(languageDetector.detectLanguage(fileName));
                codeDocument.setUploadedBy(currentUser.getCurrentUser());
                log.info("Saving file {}", fileName);
                codeDocumentRepository.save(codeDocument);
                log.debug("Saved file {}", fileName);

                zis.closeEntry();
            }
        }
        catch (IOException ex){
            throw new RuntimeException(ex);
        }
        log.info("Zip upload completed for review session {}", reviewSessionId);
        return "File uploaded";

    }

    @Override
    public List<DocumentResponseDTO> getAll(Long reviewSessionId) {
        log.info("Getting all docs for review session {}", reviewSessionId);
        return codeDocumentRepository.findByReviewSessionId(reviewSessionId)
                .stream()
                .map(document->new DocumentResponseDTO(
                        document.getId(),
                        document.getFileName(),
                        document.getContent()
                ))
                .toList();
    }

    @Override
    public DocumentResponseDTO get(Long reviewSessionId, Long id) {
        log.info("Getting doc {} from review session {}", id, reviewSessionId);
        //return codeDocumentRepository.findByReviewSessionIdAndId(reviewSessionId,id).orElseThrow(()->new RuntimeException("No document found"));
        CodeDocument document = codeDocumentRepository.findByReviewSessionIdAndId(reviewSessionId, id).orElseThrow(() ->
                        new RuntimeException("Document not found"));
        log.debug("Found doc {}", document.getFileName());

        return new DocumentResponseDTO(
                document.getId(),
                document.getFileName(),
                document.getContent()
        );
    }

    @Override
    public String delete(Long reviewSessionId, Long documentId) {
        log.info("Deleting doc {}", documentId);
        CodeDocument document = codeDocumentRepository.findByReviewSessionIdAndId(reviewSessionId, documentId)
                        .orElseThrow(() -> new RuntimeException("Document not found"));
        codeDocumentRepository.delete(document);
        log.info("Doc deleted {}", documentId);
        return "Document deleted successfully";
    }
}
