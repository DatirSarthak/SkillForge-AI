package com.skillforge.service.impl;

import com.skillforge.config.ResumeReviewProperties;
import com.skillforge.entity.User;
import com.skillforge.service.ResumeStorageResult;
import com.skillforge.service.ResumeStorageService;
import com.skillforge.service.file.FileStorageRequest;
import com.skillforge.service.file.FileStorageResult;
import com.skillforge.service.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResumeStorageServiceImpl
        implements ResumeStorageService {

    private static final String RESOURCE_TYPE = "raw";

    private final FileStorageService fileStorageService;
    private final ResumeReviewProperties resumeReviewProperties;

    @Override
    public ResumeStorageResult store(
            MultipartFile file,
            User user
    ) {
        FileStorageResult result = fileStorageService.store(
                file,
                new FileStorageRequest(
                        user.getId(),
                        resumeReviewProperties.getCloudinaryFolder(),
                        RESOURCE_TYPE
                )
        );

        return new ResumeStorageResult(
                result.secureUrl(),
                result.publicId()
        );
    }

    @Override
    public void delete(String publicId) {
        fileStorageService.delete(
                publicId,
                RESOURCE_TYPE
        );
    }
}
