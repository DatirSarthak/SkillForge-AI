import { FileText, Clock3 } from "lucide-react";

const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toLocaleString("en-IN", {
        date: "medium",
        time: "short",
    });
};

const formatContent = (content) => {
    if (!content) return "";

    return String(content).trim();
};

export default function NotesEditor({ note }) {
    if (!note) {
        return null;
    }

    const content = formatContent(note.generatedContent);

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <FileText size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="break-words text-xl font-bold text-slate-900 dark:text-white">
                            {note.title || "Untitled Note"}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            {note.noteType && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800">
                                    {note.noteType.replaceAll("_", " ")}
                                </span>
                            )}

                            {note.createdAt && (
                                <span className="flex items-center gap-1">
                                    <Clock3 size={13} />
                                    {formatDate(note.updatedAt || note.createdAt)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Generated Content */}
            <div className="p-6">
                {content ? (
                    <div className="whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                        {content}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            No generated content available.
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
}