package com.skillforge.service.file;

import java.util.Map;
import java.util.Set;

public record FileValidationPolicy(
        long maxSizeBytes,
        Set<String> allowedExtensions,
        Map<String, Set<String>> allowedMimeTypes
) {
}
