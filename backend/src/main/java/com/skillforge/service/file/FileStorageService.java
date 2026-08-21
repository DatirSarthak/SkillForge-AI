package com.skillforge.service.file;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    FileStorageResult store(
            MultipartFile file,
            FileStorageRequest request
    );

    void delete(
            String publicId,
            String resourceType
    );
}
