package com.skillforge.service;

import com.skillforge.dto.search.SearchResponseDto;

public interface SearchService {

    SearchResponseDto search(String query, int limit);
}
