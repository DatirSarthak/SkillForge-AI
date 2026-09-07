import {
    Edit3,
    FileText,
    Trash2,
    Sparkles,
    Check,
} from "lucide-react";

export default function NotesToolbar({
    note,
    onDelete,
    onEdit,
}) {
    if (!note) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <FileText size={18} />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Note Preview
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Select a note from your history.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Information */}
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <FileText size={19} />
                    </div>

                    <div className="min-w-0">
                        <div className="flex min-w-0 items-center gap-2">
                            <p className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                                {note.title || "Untitled Note"}
                            </p>

                            <span className="hidden shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 sm:inline-flex">
                                <Check size={11} />
                                Saved
                            </span>
                        </div>

                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                            {note.noteType?.replaceAll("_", " ")}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onEdit}
                        disabled={!onEdit}
                        className="
                            inline-flex h-9 flex-1 items-center
                            justify-center gap-2 rounded-lg
                            border border-slate-200 px-3
                            text-xs font-semibold text-slate-700
                            transition
                            hover:border-emerald-300
                            hover:bg-emerald-50
                            hover:text-emerald-600
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:border-slate-700
                            dark:text-slate-300
                            dark:hover:border-emerald-500/40
                            dark:hover:bg-emerald-500/10
                            dark:hover:text-emerald-400
                            sm:flex-none
                        "
                    >
                        <Edit3 size={15} />
                        <span>Rename</span>
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="
                            inline-flex h-9 flex-1 items-center
                            justify-center gap-2 rounded-lg
                            border border-slate-200 px-3
                            text-xs font-semibold text-slate-700
                            transition
                            hover:border-red-300
                            hover:bg-red-50
                            hover:text-red-600
                            dark:border-slate-700
                            dark:text-slate-300
                            dark:hover:border-red-500/40
                            dark:hover:bg-red-500/10
                            dark:hover:text-red-400
                            sm:flex-none
                        "
                    >
                        <Trash2 size={15} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-slate-800">
                <Sparkles size={12} />
                AI Generated
            </div>
        </div>
    );
}