package com.skillforge.service.impl;

import com.skillforge.exception.ResumeProcessingException;
import com.skillforge.service.ResumeTextExtractionService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;

@Service
public class ResumeTextExtractionServiceImpl
        implements ResumeTextExtractionService {

    @Override
    public String extractText(MultipartFile file) {

        String filename = file.getOriginalFilename();

        if (filename == null) {
            throw new ResumeProcessingException(
                    "Unable to process resume."
            );
        }

        String extension = getExtension(filename);

        try {
            String text = switch (extension) {
                case "pdf" -> extractPdf(file);
                case "docx" -> extractDocx(file);
                default -> throw new ResumeProcessingException(
                        "Unsupported resume format."
                );
            };

            String normalized = normalize(text);

            if (normalized.isBlank()) {
                throw new ResumeProcessingException(
                        "Unable to extract readable text from the resume."
                );
            }

            return normalized;

        } catch (ResumeProcessingException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new ResumeProcessingException(
                    "Unable to process the uploaded resume.",
                    exception
            );
        }
    }

    private String extractPdf(
            MultipartFile file
    ) throws IOException {

        byte[] bytes = file.getBytes();

        try (PDDocument document = Loader.loadPDF(bytes)) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);
        }
    }

    private String extractDocx(
            MultipartFile file
    ) throws IOException {

        try (InputStream inputStream =
                     file.getInputStream();
             XWPFDocument document =
                     new XWPFDocument(inputStream);
             XWPFWordExtractor extractor =
                     new XWPFWordExtractor(document)) {

            return extractor.getText();
        }
    }

    private String normalize(String text) {

        if (text == null) {
            return "";
        }

        return text
                .replace("\u0000", " ")
                .replaceAll("[\\t\\r]+", " ")
                .replaceAll(" +", " ")
                .replaceAll("\\n{3,}", "\n\n")
                .trim();
    }

    private String getExtension(
            String filename
    ) {
        int index = filename.lastIndexOf('.');

        if (index < 0) {
            return "";
        }

        return filename
                .substring(index + 1)
                .toLowerCase(Locale.ROOT);
    }
}
