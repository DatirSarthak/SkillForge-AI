package com.skillforge.mapper;

import com.skillforge.dto.notes.NoteResponseDto;
import com.skillforge.entity.Note;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    NoteResponseDto toDto(Note note);

    List<NoteResponseDto> toDtoList(List<Note> notes);

}
