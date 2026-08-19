package com.skillforge.dto.search;

import java.util.List;

public record SearchResponseDto(
        String query,
        List<SearchResultDto> results,
        long totalResults,
        int limit,
        boolean hasMore
) {
}
