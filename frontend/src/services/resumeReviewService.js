import api from "./api";

const RESUME_REVIEW_ENDPOINT = "/resume-reviews";

export const uploadResumeForReview = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    RESUME_REVIEW_ENDPOINT,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 120000,
    }
  );

  return response.data;
};

export const getResumeReviews = async (page = 0, size = 10) => {
  const response = await api.get(
    RESUME_REVIEW_ENDPOINT,
    {
      params: {
        page,
        size,
        sort: "createdAt,desc",
      },
    }
  );

  return response.data;
};

export const getResumeReview = async (reviewId) => {
  const response = await api.get(
    `${RESUME_REVIEW_ENDPOINT}/${reviewId}`
  );

  return response.data;
};

export const deleteResumeReview = async (reviewId) => {
  await api.delete(
    `${RESUME_REVIEW_ENDPOINT}/${reviewId}`
  );
};