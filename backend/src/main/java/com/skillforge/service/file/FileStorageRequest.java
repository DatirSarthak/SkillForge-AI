package com.skillforge.service.file;

import java.util.UUID;

public record FileStorageRequest(
        UUID ownerId,
        String folder,
        String resourceType
) {
}
