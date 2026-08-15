package com.skillforge.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.entity.User;
import com.skillforge.exception.ResumeProcessingException;
import com.skillforge.service.ResumeStorageService;
import com.skillforge.service.ResumeStorageResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeStorageServiceImpl
                implements ResumeStorageService {

        private final Cloudinary cloudinary;

        @Override
        public ResumeStorageResult store(
                        MultipartFile file,
                        User user) {

                try {

                        String userFolder = "skillforge/resumes/"
                                        + user.getId();

                        Map<?, ?> result = cloudinary.uploader().upload(
                                        file.getBytes(),
                                        ObjectUtils.asMap(
                                                        "resource_type", "raw",
                                                        "folder", userFolder,
                                                        "use_filename", false,
                                                        "unique_filename", true));

                        String url = String.valueOf(
                                        result.get("secure_url"));

                        String publicId = String.valueOf(
                                        result.get("public_id"));

                        return new ResumeStorageResult(
                                        url,
                                        publicId);

                } catch (Exception exception) {

                        log.error(
                                        "Resume storage failed. Cloudinary error type={}, message={}",
                                        exception.getClass().getName(),
                                        exception.getMessage(),
                                        exception);

                        throw new ResumeProcessingException(
                                        "Unable to store resume.",
                                        exception);
                }
        }

        @Override
        public void delete(
                        String publicId) {

                if (publicId == null || publicId.isBlank()) {
                        return;
                }

                try {

                        cloudinary
                                        .uploader()
                                        .destroy(
                                                        publicId,
                                                        ObjectUtils.asMap(
                                                                        "resource_type",
                                                                        "raw"));

                } catch (Exception exception) {

                        log.warn(
                                        "Unable to delete stored resume. publicId={}",
                                        publicId,
                                        exception);

                        throw new ResumeProcessingException(
                                        "Unable to delete stored resume.",
                                        exception);
                }
        }
}
