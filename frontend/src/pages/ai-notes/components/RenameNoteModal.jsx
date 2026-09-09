import { useEffect, useState } from "react";
import { Edit3, X } from "lucide-react";

export default function RenameNoteModal({
    open,
    note,
    loading = false,
    onClose,
    onConfirm,
}) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (open && note) {
            setTitle(note.title || "");
        }
    }, [open, note]);

    if (!open || !note) {
        return null;
    }

    const trimmedTitle = title.trim();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!trimmedTitle || loading) {
            return;
        }

        onConfirm(trimmedTitle);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rename-note-title"
        >
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Edit3 size={18} />
                        </div>

                        <div>
                            <h2
                                id="rename-note-title"
                                className="text-lg font-bold text-slate-900 dark:text-white"
                            >
                                Rename note
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                Give your note a clear title.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close rename dialog"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6">
                    <label
                        htmlFor="note-title"
                        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                        Note title
                    </label>

                    <input
                        id="note-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        maxLength={255}
                        autoFocus
                        disabled={loading}
                        placeholder="Enter note title"
                        className="
                            mt-2 w-full rounded-xl border
                            border-slate-200 bg-slate-50
                            px-3.5 py-3 text-sm
                            text-slate-900 outline-none
                            placeholder:text-slate-400
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/10
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            dark:border-slate-700
                            dark:bg-slate-950
                            dark:text-white
                        "
                    />

                    <p className="mt-1.5 text-right text-[11px] text-slate-400">
                        {title.length}/255
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                                rounded-xl border border-slate-200
                                bg-white px-4 py-2.5
                                text-sm font-semibold text-slate-700
                                transition hover:bg-slate-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:border-slate-700
                                dark:bg-slate-900
                                dark:text-slate-300
                                dark:hover:bg-slate-800
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!trimmedTitle || loading}
                            className="
                                rounded-xl px-4 py-2.5
                                text-sm font-semibold
                                transition
                                bg-slate-900 text-white
                                hover:bg-slate-800
                                disabled:cursor-not-allowed
                                disabled:bg-slate-300
                                disabled:text-slate-500
                                dark:bg-white
                                dark:text-slate-900
                                dark:hover:bg-slate-200
                                dark:disabled:bg-slate-700
                                dark:disabled:text-slate-400
                            "
                        >
                            {loading ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}