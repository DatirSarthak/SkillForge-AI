package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.notes.GenerateNotesRequestDto;
import com.skillforge.dto.notes.NoteResponseDto;
import com.skillforge.dto.notes.UpdateNoteRequestDto;
import com.skillforge.service.NotesService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NotesController {

    private final NotesService notesService;

    @PostMapping("/generate")
    public ApiResponse<NoteResponseDto> generateNotes(
            @Valid @RequestBody GenerateNotesRequestDto request,
            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Notes generated successfully.",
                notesService.generateNotes(request),
                httpRequest.getRequestURI()
        );
    }

    @GetMapping
    public ApiResponse<List<NoteResponseDto>> getAllNotes(
            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Notes fetched successfully.",
                notesService.getAllNotes(),
                httpRequest.getRequestURI()
        );
    }

    @GetMapping("/{noteId}")
    public ApiResponse<NoteResponseDto> getNoteById(
            @PathVariable UUID noteId,
            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Note fetched successfully.",
                notesService.getNoteById(noteId),
                httpRequest.getRequestURI()
        );
    }

    @PutMapping("/{noteId}")
    public ApiResponse<NoteResponseDto> updateNote(
            @PathVariable UUID noteId,
            @Valid @RequestBody UpdateNoteRequestDto request,
            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Note updated successfully.",
                notesService.updateNote(noteId, request),
                httpRequest.getRequestURI()
        );
    }

    @DeleteMapping("/{noteId}")
    public ApiResponse<Void> deleteNote(
            @PathVariable UUID noteId,
            HttpServletRequest httpRequest
    ) {

        notesService.deleteNote(noteId);

        return ResponseUtil.success(
                "Note deleted successfully.",
                null,
                httpRequest.getRequestURI()
        );
    }

    @GetMapping("/search")
    public ApiResponse<List<NoteResponseDto>> searchNotes(
            @RequestParam String keyword,
            HttpServletRequest httpRequest
    ) {

        return ResponseUtil.success(
                "Notes fetched successfully.",
                notesService.searchNotes(keyword),
                httpRequest.getRequestURI()
        );
    }
}
