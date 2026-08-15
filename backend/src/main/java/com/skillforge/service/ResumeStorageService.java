package com.skillforge.service;

import com.skillforge.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeStorageService {

    ResumeStorageResult store(
            MultipartFile file,
            User user
    );

    void delete(String publicId);
}