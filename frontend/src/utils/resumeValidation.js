export const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
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

  const extension = file.name?.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["pdf", "docx", "txt"];

  if (!allowedExtensions.includes(extension)) {
    return "Only PDF, DOCX and TXT files are supported.";
  }

  if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
    return "The selected file type does not match its extension.";
  }

  return null;
};
