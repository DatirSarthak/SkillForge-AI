package com.skillforge.mapper;

import com.skillforge.dto.roadmap.RoadmapResponseDto;
import com.skillforge.dto.roadmap.RoadmapStepDto;
import com.skillforge.dto.roadmap.RoadmapSummaryDto;
import com.skillforge.entity.Roadmap;
import com.skillforge.entity.RoadmapStep;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoadmapMapper {

    RoadmapStepDto toStepDto(RoadmapStep step);

    RoadmapResponseDto toResponseDto(Roadmap roadmap);

    @Mapping(
            target = "stepCount",
            expression = "java(roadmap.getSteps() == null ? 0 : roadmap.getSteps().size())"
    )
    RoadmapSummaryDto toSummaryDto(Roadmap roadmap);
}