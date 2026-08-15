import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteResumeReview,
  getResumeReview,
  getResumeReviews,
  uploadResumeForReview,
} from "../services/resumeReviewService";

import {
  RESUME_REVIEW_QUERY_KEYS,
} from "../constants/resumeReviewConstants";

export const useResumeReviews = (
  page = 0,
  size = 10
) => {
  return useQuery({
    queryKey: [
      ...RESUME_REVIEW_QUERY_KEYS.ALL,
      page,
      size,
    ],
    queryFn: () =>
      getResumeReviews(page, size),
  });
};

export const useResumeReview = (
  reviewId,
  options = {}
) => {
  return useQuery({
    queryKey:
      RESUME_REVIEW_QUERY_KEYS.DETAIL(
        reviewId
      ),
    queryFn: () =>
      getResumeReview(reviewId),
    enabled:
      Boolean(reviewId) &&
      (options.enabled ?? true),
  });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResumeForReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          RESUME_REVIEW_QUERY_KEYS.ALL,
      });
    },
  });
};

export const useDeleteResumeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResumeReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          RESUME_REVIEW_QUERY_KEYS.ALL,
      });
    },
  });
};