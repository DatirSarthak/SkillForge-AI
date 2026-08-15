package com.skillforge.service;

import com.skillforge.dto.notes.GenerateNotesRequestDto;
import com.skillforge.dto.notes.NoteResponseDto;
import com.skillforge.dto.notes.UpdateNoteRequestDto;

import java.util.List;
import java.util.UUID;

public interface NotesService {

    NoteResponseDto generateNotes(GenerateNotesRequestDto request);

    List<NoteResponseDto> getAllNotes();

    NoteResponseDto getNoteById(UUID noteId);

    NoteResponseDto updateNote(UUID noteId,
                               UpdateNoteRequestDto request);

    void deleteNote(UUID noteId);

    List<NoteResponseDto> searchNotes(String keyword);

}
