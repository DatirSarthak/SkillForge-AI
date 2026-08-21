import { useState } from "react";
import { toast } from "react-hot-toast";

import FileDropzone from "../../../components/file-upload/FileDropzone";

import {
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_SIZE_MB,
} from "../../../constants/resumeReviewConstants";

import { validateResumeFile } from "../../../utils/resumeValidation";

const ResumeUpload = ({
  onSubmit,
  isUploading = false,
}) => {
  const [file, setFile] = useState(null);

  const selectFile = (selectedFile) => {
    const error = validateResumeFile(selectedFile);

    if (error) {
      toast.error(error);
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    if (isUploading) return;
    setFile(null);
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please select your resume first.");
      return;
    }

    onSubmit?.(file);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Upload your resume
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Get an AI-powered ATS review and actionable career feedback.
        </p>
      </div>

      <FileDropzone
        file={file}
        onFileSelect={selectFile}
        onRemove={removeFile}
        isDisabled={isUploading}
        accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        supportedTypesLabel={RESUME_ALLOWED_EXTENSIONS.join(" / ") + " / .txt"}
        maxSizeLabel={`Max ${RESUME_MAX_SIZE_MB} MB`}
        title="Drop your resume here"
        description="or click to browse from your device"
        actionLabel="Review Resume"
        actionLoadingLabel="Analyzing Resume..."
        onSubmit={handleSubmit}
        isSubmitting={isUploading}
      />
    </section>
  );
};

export default ResumeUpload;
