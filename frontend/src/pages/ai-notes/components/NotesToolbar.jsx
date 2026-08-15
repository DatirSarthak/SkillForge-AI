import { useEffect, useState } from "react";
import {
    Check,
    Edit3,
    FileText,
    Trash2,
    X,
} from "lucide-react";

export default function NotesToolbar({
    note,
    onDelete,
    onEdit,
    isUpdating = false,
}) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(note?.title || "");
    }, [note]);

    if (!note) {
        return (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <FileText size={18} />
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Note Preview
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Select a note to view it
                    </p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        if (trimmedTitle === note.title) {
            onEdit(null);
            return;
        }

        onEdit({
            id: note.id,
            payload: {
                title: trimmedTitle,
            },
        });
    };

    const handleCancel = () => {
        setTitle(note.title || "");
        onEdit(null);
    };

    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            {/* Note information */}
            <div className="flex min-w-0 flex-1 items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">

                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        disabled={isUpdating}
                        aria-label="Note title"
                        className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-slate-50 focus:ring-2 focus:ring-emerald-500/10 dark:text-white dark:focus:border-emerald-500/50 dark:focus:bg-slate-950"
                    />

                    {note.noteType && (
                        <p className="mt-0.5 px-2 text-xs text-slate-500 dark:text-slate-400">
                            {note.noteType.replaceAll("_", " ")}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={
                        isUpdating ||
                        !title.trim() ||
                        title.trim() === (note.title || "")
                    }
                    aria-label="Save note title"
                    title="Save title"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                >
                    <Check size={17} />
                </button>

                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isUpdating}
                    aria-label="Cancel title edit"
                    title="Cancel"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                    <X size={17} />
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    disabled={isUpdating}
                    aria-label="Delete note"
                    title="Delete note"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                    <Trash2 size={17} />
                </button>
            </div>
        </div>
    );
}