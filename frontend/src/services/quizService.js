import api from "../services/api";

const QUIZ_BASE_URL = "/ai/quizzes";

const generateQuiz = async (payload) => {
  const response = await api.post(
    `${QUIZ_BASE_URL}/generate`,
    payload
  );

  return response.data;
};

const getQuizzes = async () => {
  const response = await api.get(QUIZ_BASE_URL);

  return response.data;
};

const getQuiz = async (quizId) => {
  const response = await api.get(
    `${QUIZ_BASE_URL}/${quizId}`
  );

  return response.data;
};

const submitQuiz = async (quizId, payload) => {
  const response = await api.post(
    `${QUIZ_BASE_URL}/${quizId}/submit`,
    payload
  );

  return response.data;
};

const getAttempt = async (attemptId) => {
  const response = await api.get(
    `${QUIZ_BASE_URL}/attempts/${attemptId}`
  );

  return response.data;
};

const deleteQuiz = async (quizId) => {
  const response = await api.delete(
    `${QUIZ_BASE_URL}/${quizId}`
  );

  return response.data;
};

export const quizService = {
  generateQuiz,
  getQuizzes,
  getQuiz,
  submitQuiz,
  getAttempt,
  deleteQuiz,
};

export default quizService;