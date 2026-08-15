// src/constants/notesConstants.js

export const NOTE_TYPES = [
  {
    value: "DETAILED",
    label: "Detailed Notes",
    description: "Comprehensive explanation with examples",
  },
  {
    value: "SUMMARY",
    label: "Summary",
    description: "Short and concise overview",
  },
  {
    value: "BULLET_POINTS",
    label: "Bullet Points",
    description: "Easy-to-read bullet format",
  },
  {
    value: "INTERVIEW",
    label: "Interview Notes",
    description: "Focused on interview preparation",
  },
  {
    value: "REVISION",
    label: "Revision Notes",
    description: "Quick revision before exams",
  },
];

export const NOTE_DEFAULTS = {
  title: "",
  prompt: "",
  noteType: "DETAILED",
};

export const NOTE_LIMITS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  PROMPT_MIN_LENGTH: 10,
  PROMPT_MAX_LENGTH: 5000,
};

export const NOTE_MESSAGES = {
  GENERATE_SUCCESS: "Notes generated successfully.",
  UPDATE_SUCCESS: "Note updated successfully.",
  DELETE_SUCCESS: "Note deleted successfully.",

  GENERATE_FAILED: "Failed to generate notes.",
  UPDATE_FAILED: "Failed to update note.",
  DELETE_FAILED: "Failed to delete note.",

  LOADING: "Generating AI notes...",
  EMPTY: "No notes found.",
};

export const NOTE_ENDPOINTS = {
  GENERATE: "/notes/generate",
  GET_ALL: "/notes",
  GET_BY_ID: (id) => `/notes/${id}`,
  UPDATE: (id) => `/notes/${id}`,
  DELETE: (id) => `/notes/${id}`,
  SEARCH: "/notes/search",
};