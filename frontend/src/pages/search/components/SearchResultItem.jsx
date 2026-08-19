import {
  FileText,
  GraduationCap,
  Map,
  ClipboardCheck,
} from "lucide-react";

const ICONS = {
  NOTE: FileText,
  QUIZ: ClipboardCheck,
  ROADMAP: Map,
  RESUME_REVIEW: GraduationCap,
};

const LABELS = {
  NOTE: "AI Note",
  QUIZ: "AI Quiz",
  ROADMAP: "AI Roadmap",
  RESUME_REVIEW: "Resume Review",
};

const SearchResultItem = ({ result, onSelect }) => {
  const Icon = ICONS[result.type] || FileText;
  const label = LABELS[result.type] || "Resource";

  const formattedDate = result.createdAt
    ? new Date(result.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <button
      type="button"
      onClick={() => onSelect(result)}
      className="
        flex w-full items-start gap-4 rounded-2xl border border-slate-200
        bg-white p-4 text-left transition
        hover:border-indigo-300 hover:shadow-sm
        dark:border-slate-700 dark:bg-slate-900
        dark:hover:border-indigo-500/50
      "
    >
      <span
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl bg-indigo-50 text-indigo-600
          dark:bg-indigo-500/10 dark:text-indigo-400
        "
      >
        <Icon size={20} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate font-semibold text-slate-900 dark:text-white">
            {result.title}
          </span>

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {label}
          </span>
        </span>

        <span className="mt-1 block line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {result.preview}
        </span>

        {formattedDate && (
          <span className="mt-2 block text-xs text-slate-400 dark:text-slate-500">
            {formattedDate}
          </span>
        )}
      </span>
    </button>
  );
};

export default SearchResultItem;
