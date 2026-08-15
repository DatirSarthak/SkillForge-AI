package com.skillforge.validation;

import com.skillforge.exception.InvalidResumeFileException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Component
public class ResumeFileValidator {

    private static final long MAX_FILE_SIZE =
            5 * 1024 * 1024;

    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of(
                    "pdf",
                    "docx",
                    "txt"
            );

    public void validate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new InvalidResumeFileException(
                    "Resume file is required"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidResumeFileException(
                    "Resume file must not exceed 5 MB"
            );
        }

        String originalName = file.getOriginalFilename();

        if (originalName == null || originalName.isBlank()) {
            throw new InvalidResumeFileException(
                    "Invalid resume file name"
            );
        }

        String extension = getExtension(originalName);

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new InvalidResumeFileException(
                    "Only PDF, DOCX and TXT resumes are supported"
            );
        }

        validateMimeType(file, extension);
    }

    private void validateMimeType(
            MultipartFile file,
            String extension
    ) {

        String contentType = file.getContentType();

        if (contentType == null) {
            throw new InvalidResumeFileException(
                    "Unable to determine file type"
            );
        }

        boolean valid = switch (extension) {

            case "pdf" ->
                    contentType.equalsIgnoreCase(
                            "application/pdf"
                    );

            case "docx" ->
                    contentType.equalsIgnoreCase(
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    );

            case "txt" ->
                    contentType.equalsIgnoreCase(
                            "text/plain"
                    );

            default -> false;
        };

        if (!valid) {
            throw new InvalidResumeFileException(
                    "File content does not match its extension"
            );
        }
    }

    private String getExtension(String filename) {

        int index = filename.lastIndexOf('.');

        if (index < 0) {
            return "";
        }

        return filename
                .substring(index + 1)
                .toLowerCase();
    }
}
