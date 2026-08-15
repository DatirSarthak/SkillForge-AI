package com.skillforge.service.impl;

import com.skillforge.dto.notes.GenerateNotesRequestDto;
import com.skillforge.dto.notes.NoteResponseDto;
import com.skillforge.dto.notes.UpdateNoteRequestDto;
import com.skillforge.entity.Note;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.mapper.NoteMapper;
import com.skillforge.repository.NoteRepository;
import com.skillforge.service.AiProvider;
import com.skillforge.service.NotesService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class NotesServiceImpl implements NotesService {

    private final NoteRepository noteRepository;
    private final UserService userService;
    private final AiProvider aiProvider;
    private final NoteMapper noteMapper;

    @Override
    public NoteResponseDto generateNotes(
            GenerateNotesRequestDto request
    ) {

        User currentUser = userService.getCurrentUserEntity();

        String aiResponse =
                aiProvider.generateResponse(request.getPrompt());

        Note note = Note.builder()
                .user(currentUser)
                .title(request.getTitle())
                .prompt(request.getPrompt())
                .generatedContent(aiResponse)
                .noteType(request.getNoteType())
                .build();

        Note savedNote = noteRepository.save(note);

        return noteMapper.toDto(savedNote);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteResponseDto> getAllNotes() {

        User currentUser = userService.getCurrentUserEntity();

        return noteMapper.toDtoList(
                noteRepository.findByUserOrderByUpdatedAtDesc(
                        currentUser
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public NoteResponseDto getNoteById(UUID noteId) {

        User currentUser = userService.getCurrentUserEntity();

        Note note = noteRepository
                .findByIdAndUser(noteId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found."
                        )
                );

        return noteMapper.toDto(note);
    }

    @Override
    public NoteResponseDto updateNote(
            UUID noteId,
            UpdateNoteRequestDto request
    ) {

        User currentUser = userService.getCurrentUserEntity();

        Note note = noteRepository
                .findByIdAndUser(noteId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found."
                        )
                );

        note.setTitle(request.getTitle());

        Note updatedNote = noteRepository.save(note);

        return noteMapper.toDto(updatedNote);
    }

    @Override
    public void deleteNote(UUID noteId) {

        User currentUser = userService.getCurrentUserEntity();

        Note note = noteRepository
                .findByIdAndUser(noteId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found."
                        )
                );

        noteRepository.delete(note);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteResponseDto> searchNotes(
            String keyword
    ) {

        User currentUser = userService.getCurrentUserEntity();

        return noteMapper.toDtoList(
                noteRepository
                        .findByUserAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(
                                currentUser,
                                keyword
                        )
        );
    }
}
