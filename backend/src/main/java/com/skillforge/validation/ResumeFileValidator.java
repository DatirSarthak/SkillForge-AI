package com.skillforge.validation;

import com.skillforge.service.file.FileValidationPolicy;
import com.skillforge.validation.file.FileValidationService;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Set;

@Component
public class ResumeFileValidator {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private static final FileValidationPolicy POLICY =
            new FileValidationPolicy(
                    MAX_FILE_SIZE,
                    Set.of("pdf", "docx", "txt"),
                    Map.of(
                            "pdf", Set.of("application/pdf"),
                            "docx", Set.of(
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ),
                            "txt", Set.of("text/plain")
                    )
            );

    private final FileValidationService fileValidationService;

    public ResumeFileValidator(FileValidationService fileValidationService) {
        this.fileValidationService = fileValidationService;
    }

    public void validate(MultipartFile file) {
        fileValidationService.validate(file, POLICY);
    }
}
