import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
} from "lucide-react";

export default function DeleteNoteDialog({
    open,
    note,
    loading = false,
    onCancel,
    onConfirm,
}) {
    if (!open) {
        return null;
    }

    const handleConfirm = () => {
        if (!note?.id || loading) {
            return;
        }

        onConfirm(note.id);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-note-title"
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-200 p-5 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            <AlertTriangle size={20} />
                        </div>

                        <div>
                            <h2
                                id="delete-note-title"
                                className="font-bold text-slate-900 dark:text-white"
                            >
                                Delete Note
                            </h2>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        aria-label="Close dialog"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Are you sure you want to permanently delete
                        this note?
                    </p>

                    {note?.title && (
                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                {note.title}
                            </p>

                            {note.noteType && (
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {note.noteType.replaceAll(
                                        "_",
                                        " "
                                    )}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-5 sm:flex-row sm:justify-end dark:border-slate-800">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading || !note?.id}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />

                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={17} />

                                Delete Note
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}