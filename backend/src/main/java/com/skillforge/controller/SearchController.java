package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.search.SearchResponseDto;
import com.skillforge.service.SearchService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Validated
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ApiResponse<SearchResponseDto> search(
            @RequestParam
            @Size(min = 2, max = 100)
            String q,

            @RequestParam(defaultValue = "20")
            @Min(1)
            @Max(50)
            int limit,

            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Search results fetched successfully.",
                searchService.search(q, limit),
                httpRequest.getRequestURI()
        );
    }
}
