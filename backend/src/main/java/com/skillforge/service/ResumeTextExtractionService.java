package com.skillforge.service;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeTextExtractionService {

    String extractText(
            MultipartFile file
    );
}
