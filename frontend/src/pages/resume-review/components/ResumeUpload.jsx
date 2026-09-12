import { useState } from "react";
import { toast } from "react-hot-toast";
import { UploadCloud } from "lucide-react";

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
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Section Header */}
      <div className="border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-purple-100
              text-purple-600
              dark:bg-purple-950/40
              dark:text-purple-400
            "
          >
            <UploadCloud className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Upload your resume
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm sm:leading-6">
              Get an AI-powered ATS review and actionable
              career feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Dropzone */}
      <div className="p-4 sm:p-6">
        <FileDropzone
          file={file}
          onFileSelect={selectFile}
          onRemove={removeFile}
          isDisabled={isUploading}
          accept="
            .pdf,
            .doc,
            .docx,
            .txt,
            application/pdf,
            application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            text/plain
          "
          supportedTypesLabel={
            RESUME_ALLOWED_EXTENSIONS.join(" / ")
          }
          maxSizeLabel={`Max ${RESUME_MAX_SIZE_MB} MB`}
          title="Drop your resume here"
          description="or click to browse from your device"
          actionLabel="Review Resume"
          actionLoadingLabel="Analyzing Resume..."
          onSubmit={handleSubmit}
          isSubmitting={isUploading}
        />
      </div>
    </section>
  );
};

export default ResumeUpload;
