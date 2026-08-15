import { useRef, useState } from "react";
import {
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_SIZE_MB,
} from "../../../constants/resumeReviewConstants";

import { validateResumeFile } from "../../../utils/resumeValidation";

const ResumeUpload = ({
  onSubmit,
  isUploading = false,
}) => {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const selectFile = (selectedFile) => {
    const error = validateResumeFile(selectedFile);

    if (error) {
      toast.error(error);
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (selectedFile) {
      selectFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (droppedFile) {
      selectFile(droppedFile);
    }
  };

  const removeFile = () => {
    if (isUploading) return;

    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

      {!file ? (
        <button
          type="button"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDrop={handleDrop}
          className={[
            "flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
            dragActive
              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
              : "border-slate-300 hover:border-purple-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-purple-700 dark:hover:bg-slate-800/40",
            isUploading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer",
          ].join(" ")}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/40">
            <UploadCloud className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>

          <span className="mt-5 text-sm font-semibold text-slate-900 dark:text-white">
            Drop your resume here
          </span>

          <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            or click to browse from your device
          </span>

          <span className="mt-4 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {RESUME_ALLOWED_EXTENSIONS.join(" / ")} • Max{" "}
            {RESUME_MAX_SIZE_MB} MB
          </span>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleInputChange}
            disabled={isUploading}
          />
        </button>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/40">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {file.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isUploading}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              aria-label="Remove selected resume"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {isUploading
              ? "Analyzing Resume..."
              : "Review Resume"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ResumeUpload;