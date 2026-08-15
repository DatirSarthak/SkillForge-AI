package com.skillforge.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.dto.resume.ResumeReviewResponseDto;
import com.skillforge.dto.resume.ResumeReviewSummaryDto;
import com.skillforge.entity.ResumeReview;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResumeReviewMapper {

    ResumeReviewResponseDto toResponseDto(
            ResumeReview entity
    );

    ResumeReviewSummaryDto toSummaryDto(
            ResumeReview entity
    );

    default List<String> map(String value) {

        if (value == null || value.isBlank()) {
            return List.of();
        }

        try {
            return new ObjectMapper().readValue(
                    value,
                    new TypeReference<List<String>>() {
                    }
            );

        } catch (JsonProcessingException exception) {
            return List.of(value);
        }
    }
}