export const RESUME_REVIEW_ROUTES = {
  ROOT: "/resume-review",
};

export const RESUME_REVIEW_QUERY_KEYS = {
  ALL: ["resume-reviews"],
  DETAIL: (id) => ["resume-reviews", id],
};

export const RESUME_ALLOWED_EXTENSIONS = [
  ".pdf",
  ".docx",
];

export const RESUME_MAX_SIZE_MB = 5;