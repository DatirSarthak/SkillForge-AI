export const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const validateResumeFile = (file) => {
  if (!file) {
    return "Please select a resume.";
  }

  if (file.size === 0) {
    return "The selected file is empty.";
  }

  if (file.size > MAX_RESUME_SIZE) {
    return "Resume size must not exceed 5 MB.";
  }

  if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
    return "Only PDF and DOCX files are supported.";
  }

  return null;
};