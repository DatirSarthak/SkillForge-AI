import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import PropTypes from "prop-types";

const FileDropzone = ({
  file,
  onFileSelect,
  onRemove,
  isDisabled = false,
  accept = "",
  supportedTypesLabel = "Supported file types",
  maxSizeLabel = "",
  title = "Upload a file",
  description = "Drop your file here or click to browse from your device.",
  selectError,
  actionLabel = "Continue",
  actionLoadingLabel = "Uploading...",
  onSubmit,
  isSubmitting = false,
}) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const selectFile = (selectedFile) => {
    if (!selectedFile || isDisabled) return;
    onFileSelect?.(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleKeyDown = (event) => {
    if (isDisabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const handleRemove = () => {
    if (isDisabled || isSubmitting) return;

    onRemove?.();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled}
          onKeyDown={handleKeyDown}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!isDisabled) setDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!isDisabled) setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDrop={handleDrop}
          onClick={() => {
            if (!isDisabled) inputRef.current?.click();
          }}
          className={[
            "flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
            dragActive
              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
              : "border-slate-300 hover:border-purple-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-purple-700 dark:hover:bg-slate-800/40",
            isDisabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer",
          ].join(" ")}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/40">
            <UploadCloud className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>

          <span className="mt-5 text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </span>

          <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </span>

          <span className="mt-4 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {supportedTypesLabel}
            {maxSizeLabel ? ` • ${maxSizeLabel}` : ""}
          </span>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => selectFile(event.target.files?.[0])}
            disabled={isDisabled}
          />
        </div>
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
              onClick={handleRemove}
              disabled={isDisabled || isSubmitting}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {selectError && (
            <p
              role="alert"
              className="mt-3 text-sm font-medium text-red-600 dark:text-red-400"
            >
              {selectError}
            </p>
          )}

          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isDisabled || isSubmitting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {isSubmitting ? actionLoadingLabel : actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  file: PropTypes.object,
  onFileSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  accept: PropTypes.string,
  supportedTypesLabel: PropTypes.string,
  maxSizeLabel: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  selectError: PropTypes.string,
  actionLabel: PropTypes.string,
  actionLoadingLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default FileDropzone;
