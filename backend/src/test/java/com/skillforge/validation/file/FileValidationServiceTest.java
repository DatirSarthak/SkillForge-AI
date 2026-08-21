package com.skillforge.validation.file;

import com.skillforge.exception.FileValidationException;
import com.skillforge.service.file.FileValidationPolicy;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class FileValidationServiceTest {

    private static final FileValidationPolicy POLICY =
            new FileValidationPolicy(
                    5 * 1024 * 1024,
                    Set.of("pdf", "docx", "txt"),
                    Map.of(
                            "pdf", Set.of("application/pdf"),
                            "docx", Set.of(
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ),
                            "txt", Set.of("text/plain")
                    )
            );

    private final FileValidationService service = new FileValidationService();

    @Test
    void shouldAcceptValidPdf() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.pdf",
                "application/pdf",
                "%PDF-1.7\ncontent".getBytes(StandardCharsets.US_ASCII)
        );

        assertDoesNotThrow(() -> service.validate(file, POLICY));
    }

    @Test
    void shouldRejectMimeTypeMismatch() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.pdf",
                "text/plain",
                "%PDF-1.7\ncontent".getBytes(StandardCharsets.US_ASCII)
        );

        assertThrows(FileValidationException.class, () -> service.validate(file, POLICY));
    }

    @Test
    void shouldRejectPathTraversalFilename() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "../resume.pdf",
                "application/pdf",
                "%PDF-1.7\ncontent".getBytes(StandardCharsets.US_ASCII)
        );

        assertThrows(FileValidationException.class, () -> service.validate(file, POLICY));
    }

    @Test
    void shouldRejectOversizedFile() {
        byte[] bytes = new byte[(5 * 1024 * 1024) + 1];

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.pdf",
                "application/pdf",
                bytes
        );

        assertThrows(FileValidationException.class, () -> service.validate(file, POLICY));
    }

    @Test
    void shouldRejectInvalidPdfSignature() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.pdf",
                "application/pdf",
                "not-a-pdf".getBytes(StandardCharsets.UTF_8)
        );

        assertThrows(FileValidationException.class, () -> service.validate(file, POLICY));
    }

    @Test
    void shouldRejectDangerousDoubleExtension() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "resume.exe.pdf",
                "application/pdf",
                "%PDF-1.7\ncontent".getBytes(StandardCharsets.US_ASCII)
        );

        assertThrows(FileValidationException.class, () -> service.validate(file, POLICY));
    }
}
