import { useMemo, useState } from "react";
import {
    FileText,
    Search,
    Clock3,
    X,
} from "lucide-react";

const formatDate = (date) => {
    if (!date) return "";

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

export default function NotesHistory({
    notes = [],
    selectedNote,
    onSelect,
    isLoading,
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNotes = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return notes;
        }

        return notes.filter((note) => {
            const title = note?.title?.toLowerCase() || "";
            const type = note?.noteType?.toLowerCase() || "";
            const content = note?.generatedContent?.toLowerCase() || "";

            return (
                title.includes(query) ||
                type.includes(query) ||
                content.includes(query)
            );
        });
    }, [notes, searchTerm]);

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

            {/* Header */}
            <div className="border-b border-slate-200 p-5 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <FileText size={19} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-slate-900 dark:text-white">
                                My Notes
                            </h2>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {notes.length}{" "}
                                {notes.length === 1 ? "note" : "notes"}
                            </p>
                        </div>
                    </div>

                    <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:inline-flex">
                        {notes.length}
                    </span>
                </div>

                {/* Search */}
                <div className="relative mt-4">
                    <Search
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        placeholder="Search notes..."
                        aria-label="Search notes"
                        className="
                            w-full rounded-xl border border-slate-200
                            bg-slate-50 py-2.5 pl-10 pr-10
                            text-sm text-slate-900 outline-none
                            placeholder:text-slate-400
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/10
                            dark:border-slate-700
                            dark:bg-slate-950
                            dark:text-white
                        "
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear note search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>
            </div>

            {/* Notes */}
            <div className="max-h-[420px] overflow-y-auto p-2.5 lg:max-h-[calc(100vh-300px)]">

                {isLoading ? (
                    <div className="space-y-2 p-2">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                ) : notes.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                            <FileText size={20} />
                        </div>

                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            No notes yet
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Generate your first AI note.
                        </p>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                            <Search size={20} />
                        </div>

                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            No matching notes
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Try a different title or keyword.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredNotes.map((note) => {
                            const isSelected =
                                selectedNote?.id === note.id;

                            return (
                                <button
                                    key={note.id}
                                    type="button"
                                    onClick={() => onSelect(note)}
                                    className={`
                                        group w-full rounded-xl border p-3.5
                                        text-left transition-all
                                        ${
                                            isSelected
                                                ? "border-emerald-400 bg-emerald-50 shadow-sm dark:border-emerald-500/60 dark:bg-emerald-500/10"
                                                : "border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/70"
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`
                                                flex h-9 w-9 shrink-0
                                                items-center justify-center
                                                rounded-lg
                                                ${
                                                    isSelected
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                }
                                            `}
                                        >
                                            <FileText size={17} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                                {note.title || "Untitled Note"}
                                            </p>

                                            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                                {note.noteType?.replaceAll(
                                                    "_",
                                                    " "
                                                )}
                                            </p>

                                            <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                                                <Clock3 size={12} />

                                                {formatDate(
                                                    note.updatedAt ||
                                                        note.createdAt
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}