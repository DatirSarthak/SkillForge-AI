export const QUIZ_DIFFICULTIES = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

export const QUIZ_DIFFICULTY_OPTIONS = [
  {
    value: QUIZ_DIFFICULTIES.EASY,
    label: "Easy",
  },
  {
    value: QUIZ_DIFFICULTIES.MEDIUM,
    label: "Medium",
  },
  {
    value: QUIZ_DIFFICULTIES.HARD,
    label: "Hard",
  },
];

export const QUIZ_QUESTION_COUNT_OPTIONS = [
  {
    value: 5,
    label: "5 Questions",
  },
  {
    value: 10,
    label: "10 Questions",
  },
  {
    value: 15,
    label: "15 Questions",
  },
  {
    value: 20,
    label: "20 Questions",
  },
];

export const QUIZ_OPTION_KEYS = ["A", "B", "C", "D"];

export const QUIZ_MESSAGES = {
  GENERATE_SUCCESS: "Quiz generated successfully.",
  SUBMIT_SUCCESS: "Quiz submitted successfully.",
  DELETE_SUCCESS: "Quiz deleted successfully.",
  LOAD_ERROR: "Unable to load quiz.",
  GENERATE_ERROR: "Unable to generate quiz.",
  SUBMIT_ERROR: "Unable to submit quiz.",
  DELETE_ERROR: "Unable to delete quiz.",
};

export const QUIZ_DEFAULTS = {
  difficulty: QUIZ_DIFFICULTIES.MEDIUM,
  questionCount: 5,
};

export const QUIZ_LIMITS = {
  MIN_TOPIC_LENGTH: 2,
  MAX_TOPIC_LENGTH: 200,
  MIN_QUESTION_COUNT: 1,
  MAX_QUESTION_COUNT: 20,
};