package com.skillforge.validation.file;

import com.skillforge.exception.FileValidationException;
import com.skillforge.service.file.FileValidationPolicy;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Component
public class FileValidationService {

    private static final int MAX_FILENAME_LENGTH = 255;

    private static final Set<Character> WINDOWS_RESERVED_CHARS = Set.of(
            '<', '>', ':', '"', '/', '\\', '|', '?', '*'
    );

    private static final Set<String> DANGEROUS_INTERMEDIATE_EXTENSIONS = Set.of(
            "exe", "bat", "cmd", "com", "msi", "scr", "sh", "ps1", "vbs", "js", "jar"
    );

    public void validate(
            MultipartFile file,
            FileValidationPolicy policy
    ) {
        if (file == null || file.isEmpty()) {
            throw new FileValidationException("File is required.");
        }

        if (policy == null) {
            throw new FileValidationException("File validation policy is required.");
        }

        if (file.getSize() > policy.maxSizeBytes()) {
            throw new FileValidationException("File exceeds the maximum allowed size.");
        }

        String filename = validateFilename(file.getOriginalFilename());
        String extension = getExtension(filename);
        validateIntermediateExtensions(filename);

        if (!policy.allowedExtensions().contains(extension)) {
            throw new FileValidationException("Unsupported file extension.");
        }

        String contentType = file.getContentType();

        if (contentType == null || contentType.isBlank()) {
            throw new FileValidationException("Unable to determine file type.");
        }

        Set<String> allowedMimeTypes = policy.allowedMimeTypes().get(extension);

        if (allowedMimeTypes == null || !allowedMimeTypes.contains(contentType.toLowerCase(Locale.ROOT))) {
            throw new FileValidationException("File content does not match its extension.");
        }

        validateContent(file, extension);
    }

    private String validateFilename(String originalFilename) {
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new FileValidationException("Invalid file name.");
        }

        if (originalFilename.length() > MAX_FILENAME_LENGTH) {
            throw new FileValidationException("File name is too long.");
        }

        if (originalFilename.indexOf('\0') >= 0) {
            throw new FileValidationException("File name contains an invalid character.");
        }

        if (originalFilename.startsWith(".") || originalFilename.endsWith(".")) {
            throw new FileValidationException("Invalid file name.");
        }

        for (char character : originalFilename.toCharArray()) {
            if (Character.isISOControl(character) || WINDOWS_RESERVED_CHARS.contains(character)) {
                throw new FileValidationException("File name contains an invalid character.");
            }
        }

        return originalFilename.trim();
    }

    private void validateIntermediateExtensions(String filename) {
        String[] parts = filename.split("\\.");

        for (int index = 0; index < parts.length - 1; index++) {
            if (DANGEROUS_INTERMEDIATE_EXTENSIONS.contains(
                    parts[index].toLowerCase(Locale.ROOT)
            )) {
                throw new FileValidationException(
                        "File name contains a potentially dangerous extension."
                );
            }
        }
    }

    private String getExtension(String filename) {
        int index = filename.lastIndexOf('.');

        if (index <= 0 || index == filename.length() - 1) {
            throw new FileValidationException("File extension is required.");
        }

        return filename.substring(index + 1).toLowerCase(Locale.ROOT);
    }

    private void validateContent(
            MultipartFile file,
            String extension
    ) {
        try {
            byte[] bytes = file.getBytes();

            switch (extension) {
                case "pdf" -> validatePdf(bytes);
                case "docx" -> validateDocx(bytes);
                case "txt" -> validateText(bytes);
                default -> throw new FileValidationException("Unsupported file extension.");
            }
        } catch (IOException exception) {
            throw new FileValidationException("Unable to read uploaded file.", exception);
        }
    }

    private void validatePdf(byte[] bytes) {
        if (bytes.length < 5
                || bytes[0] != '%'
                || bytes[1] != 'P'
                || bytes[2] != 'D'
                || bytes[3] != 'F'
                || bytes[4] != '-') {
            throw new FileValidationException("Uploaded PDF content is invalid.");
        }
    }

    private void validateDocx(byte[] bytes) {
        if (bytes.length < 4
                || bytes[0] != 'P'
                || bytes[1] != 'K') {
            throw new FileValidationException("Uploaded DOCX content is invalid.");
        }

        boolean contentTypesFound = false;
        boolean wordDocumentFound = false;

        try (ZipInputStream zipInputStream =
                     new ZipInputStream(new ByteArrayInputStream(bytes))) {

            ZipEntry entry;

            while ((entry = zipInputStream.getNextEntry()) != null) {
                if ("[Content_Types].xml".equals(entry.getName())) {
                    contentTypesFound = true;
                }

                if (entry.getName().startsWith("word/")
                        && entry.getName().endsWith(".xml")) {
                    wordDocumentFound = true;
                }
            }
        } catch (IOException exception) {
            throw new FileValidationException("Uploaded DOCX content is invalid.", exception);
        }

        if (!contentTypesFound || !wordDocumentFound) {
            throw new FileValidationException("Uploaded DOCX content is invalid.");
        }
    }

    private void validateText(byte[] bytes) {
        if (bytes.length == 0) {
            throw new FileValidationException("Uploaded text file is empty.");
        }

        for (byte value : bytes) {
            if (value == 0) {
                throw new FileValidationException("Uploaded text file contains binary content.");
            }
        }

        try {
            CharBuffer decoded = StandardCharsets.UTF_8.newDecoder()
                    .onMalformedInput(CodingErrorAction.REPORT)
                    .onUnmappableCharacter(CodingErrorAction.REPORT)
                    .decode(ByteBuffer.wrap(bytes));

            if (decoded.isEmpty()) {
                throw new FileValidationException("Uploaded text file is empty.");
            }
        } catch (CharacterCodingException exception) {
            throw new FileValidationException("Uploaded text file is not valid UTF-8 text.", exception);
        }
    }
}
