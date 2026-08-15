import { Search, FileText, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import NotesCard from "./NotesCard";

export default function NotesHistory({
    notes = [],
    selectedNote,
    onSelect,
    isLoading = false,
}) {
    const [search, setSearch] = useState("");

    const filteredNotes = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return notes;
        }

        return notes.filter((note) => {
            const title = note?.title?.toLowerCase() || "";
            const prompt = note?.prompt?.toLowerCase() || "";

            return (
                title.includes(keyword) ||
                prompt.includes(keyword)
            );
        });
    }, [notes, search]);

    return (
        <section className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="border-b border-slate-200 p-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 dark:text-white">
                            My Notes
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {notes.length}{" "}
                            {notes.length === 1 ? "note" : "notes"}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mt-4">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search notes..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3">
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                            >
                                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="mt-3 h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />

                                <div className="mt-4 h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                            </div>
                        ))}
                    </div>
                ) : filteredNotes.length > 0 ? (
                    <div className="space-y-2">
                        {filteredNotes.map((note) => (
                            <NotesCard
                                key={note.id}
                                note={note}
                                selected={selectedNote?.id === note.id}
                                onClick={() => onSelect(note)}
                            />
                        ))}
                    </div>
                ) : search ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                        <Search
                            size={28}
                            className="text-slate-400"
                        />

                        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                            No matching notes
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try searching with a different keyword.
                        </p>
                    </div>
                ) : (
                    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                        <Sparkles
                            size={28}
                            className="text-emerald-500"
                        />

                        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                            No notes yet
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Generate your first AI-powered note using
                            the form.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}