package com.skillforge.service.file.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.exception.FileStorageException;
import com.skillforge.service.file.FileStorageRequest;
import com.skillforge.service.file.FileStorageResult;
import com.skillforge.service.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryFileStorageServiceImpl
        implements FileStorageService {

    private final Cloudinary cloudinary;

    @Override
    public FileStorageResult store(
            MultipartFile file,
            FileStorageRequest request
    ) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("Unable to store an empty file.");
        }

        if (request == null || request.ownerId() == null) {
            throw new FileStorageException("File owner is required.");
        }

        String folder = normalizeFolder(request.folder());
        String resourceType = normalizeResourceType(request.resourceType());
        String ownerFolder = folder + "/" + request.ownerId();

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", resourceType,
                            "folder", ownerFolder,
                            "use_filename", false,
                            "unique_filename", true
                    )
            );

            String secureUrl = String.valueOf(result.get("secure_url"));
            String publicId = String.valueOf(result.get("public_id"));

            if (secureUrl.isBlank() || publicId.isBlank()) {
                throw new FileStorageException(
                        "File storage provider returned an incomplete upload result."
                );
            }

            return new FileStorageResult(secureUrl, publicId);

        } catch (FileStorageException exception) {
            throw exception;
        } catch (Exception exception) {
            log.error(
                    "File storage failed. ownerId={}, resourceType={}, errorType={}",
                    request.ownerId(),
                    resourceType,
                    exception.getClass().getName(),
                    exception
            );

            throw new FileStorageException(
                    "Unable to store file.",
                    exception
            );
        }
    }

    @Override
    public void delete(
            String publicId,
            String resourceType
    ) {
        if (publicId == null || publicId.isBlank()) {
            return;
        }

        String normalizedResourceType = normalizeResourceType(resourceType);

        try {
            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type",
                            normalizedResourceType
                    )
            );
        } catch (Exception exception) {
            log.warn(
                    "Unable to delete stored file. resourceType={}",
                    normalizedResourceType,
                    exception
            );

            throw new FileStorageException(
                    "Unable to delete stored file.",
                    exception
            );
        }
    }

    private String normalizeFolder(String folder) {
        if (folder == null || folder.isBlank()) {
            throw new FileStorageException("Storage folder is required.");
        }

        String normalized = folder.trim()
                .replace('\\', '/')
                .replaceAll("/{2,}", "/");

        if (normalized.startsWith("/") || normalized.endsWith("/")) {
            throw new FileStorageException("Invalid storage folder.");
        }

        return normalized;
    }

    private String normalizeResourceType(String resourceType) {
        if (resourceType == null || resourceType.isBlank()) {
            return "raw";
        }

        return switch (resourceType.trim().toLowerCase()) {
            case "raw", "image", "video", "auto" -> resourceType.trim().toLowerCase();
            default -> throw new FileStorageException(
                    "Unsupported storage resource type."
            );
        };
    }
}
