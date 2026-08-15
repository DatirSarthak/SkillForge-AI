// src/services/aiNotesService.js

import api from "./api";
import { NOTE_ENDPOINTS } from "../constants/notesConstants";

const aiNotesService = {
  /**
   * Generate AI Notes
   */
  async generateNotes(payload) {
    const response = await api.post(
      NOTE_ENDPOINTS.GENERATE,
      payload
    );

    return response.data;
  },

  /**
   * Get all notes
   */
  async getAllNotes() {
    const response = await api.get(
      NOTE_ENDPOINTS.GET_ALL
    );

    return response.data;
  },

  /**
   * Get note by id
   */
  async getNoteById(noteId) {
    const response = await api.get(
      NOTE_ENDPOINTS.GET_BY_ID(noteId)
    );

    return response.data;
  },

  /**
   * Update note
   */
  async updateNote(noteId, payload) {
    const response = await api.put(
      NOTE_ENDPOINTS.UPDATE(noteId),
      payload
    );

    return response.data;
  },

  /**
   * Delete note
   */
  async deleteNote(noteId) {
    const response = await api.delete(
      NOTE_ENDPOINTS.DELETE(noteId)
    );

    return response.data;
  },

  /**
   * Search notes
   */
  async searchNotes(keyword) {
    const response = await api.get(
      NOTE_ENDPOINTS.SEARCH,
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  },
};

export default aiNotesService;