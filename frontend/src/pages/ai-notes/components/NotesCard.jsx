import {
    FileText,
    Clock3,
} from "lucide-react";

const formatDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function NotesCard({
    note,
    selected = false,
    onClick,
}) {
    const title = note?.title || "Untitled Note";

    const noteType = note?.noteType
        ? note.noteType.replaceAll("_", " ")
        : "AI Notes";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                selected
                    ? "border-emerald-400 bg-emerald-50 shadow-sm dark:border-emerald-500/50 dark:bg-emerald-500/10"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800/60"
            }`}
        >
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        selected
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-emerald-500/10 dark:group-hover:text-emerald-400"
                    }`}
                >
                    <FileText size={17} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3
                        className={`truncate text-sm font-semibold ${
                            selected
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-slate-900 dark:text-white"
                        }`}
                    >
                        {title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {noteType}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock3 size={12} />

                        <span>
                            {formatDate(
                                note?.updatedAt ||
                                    note?.createdAt
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}