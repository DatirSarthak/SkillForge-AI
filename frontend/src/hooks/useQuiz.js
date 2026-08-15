import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import quizService from "../services/quizService";

export const quizQueryKeys = {
  all: ["quizzes"],

  lists: () => [...quizQueryKeys.all, "list"],

  detail: (quizId) => [
    ...quizQueryKeys.all,
    "detail",
    quizId,
  ],

  attempt: (attemptId) => [
    ...quizQueryKeys.all,
    "attempt",
    attemptId,
  ],
};

export const useQuizzes = () => {
  return useQuery({
    queryKey: quizQueryKeys.lists(),
    queryFn: quizService.getQuizzes,
  });
};

export const useQuiz = (quizId) => {
  return useQuery({
    queryKey: quizQueryKeys.detail(quizId),
    queryFn: () => quizService.getQuiz(quizId),
    enabled: Boolean(quizId),
  });
};

export const useGenerateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quizService.generateQuiz,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: quizQueryKeys.lists(),
      });
    },
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ quizId, payload }) =>
      quizService.submitQuiz(quizId, payload),
  });
};

export const useQuizAttempt = (attemptId) => {
  return useQuery({
    queryKey: quizQueryKeys.attempt(attemptId),
    queryFn: () => quizService.getAttempt(attemptId),
    enabled: Boolean(attemptId),
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quizService.deleteQuiz,

    onMutate: async (quizId) => {
      await queryClient.cancelQueries({
        queryKey: quizQueryKeys.lists(),
      });

      const previousQuizzes = queryClient.getQueryData(
        quizQueryKeys.lists()
      );

      queryClient.setQueryData(
        quizQueryKeys.lists(),
        (currentData) => {
          if (!currentData?.data) {
            return currentData;
          }

          return {
            ...currentData,
            data: currentData.data.filter(
              (quiz) => quiz.id !== quizId
            ),
          };
        }
      );

      return {
        previousQuizzes,
      };
    },

    onError: (_error, _quizId, context) => {
      if (context?.previousQuizzes) {
        queryClient.setQueryData(
          quizQueryKeys.lists(),
          context.previousQuizzes
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: quizQueryKeys.lists(),
      });
    },
  });
};