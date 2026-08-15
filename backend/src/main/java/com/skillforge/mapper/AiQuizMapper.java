package com.skillforge.mapper;

import com.skillforge.dto.quiz.QuizQuestionDto;
import com.skillforge.dto.quiz.QuizResponseDto;
import com.skillforge.dto.quiz.QuizSummaryDto;
import com.skillforge.dto.quiz.QuizOptionDto;
import com.skillforge.entity.Quiz;
import com.skillforge.entity.QuizQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AiQuizMapper {

    @Mapping(target = "difficulty", source = "difficulty")
    QuizResponseDto toResponseDto(Quiz quiz);

    QuizSummaryDto toSummaryDto(Quiz quiz);

    @Mapping(
            target = "options",
            expression = "java(toOptions(question))"
    )
    QuizQuestionDto toQuestionDto(QuizQuestion question);

    List<QuizQuestionDto> toQuestionDtoList(
            List<QuizQuestion> questions
    );

    default List<QuizOptionDto> toOptions(QuizQuestion question) {

        return List.of(
                new QuizOptionDto("A", question.getOptionA()),
                new QuizOptionDto("B", question.getOptionB()),
                new QuizOptionDto("C", question.getOptionC()),
                new QuizOptionDto("D", question.getOptionD())
        );
    }
}
