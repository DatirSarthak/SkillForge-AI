import { useEffect, useState } from "react";
import { Sparkles, FileText } from "lucide-react";
import toast from "react-hot-toast";

import useAiNotes from "../../hooks/useAiNotes";

import NotesForm from "./components/NotesForm";
import NotesHistory from "./components/NotesHistory";
import NotesEditor from "./components/NotesEditor";
import NotesToolbar from "./components/NotesToolbar";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";
import DeleteNoteDialog from "./components/DeleteNoteDialog";
import RenameNoteModal from "./components/RenameNoteModal";

export default function AiNotesPage() {
    const {
        notes,
        isLoading,
        isGenerating,
        isUpdating,
        isDeleting,
        generateNotes,
        updateNote,
        deleteNote,
    } = useAiNotes();

    const [selectedNote, setSelectedNote] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [renameDialog, setRenameDialog] = useState(false);

    useEffect(() => {
        if (!selectedNote && notes.length > 0) {
            setSelectedNote(notes[0]);
        }
    }, [notes, selectedNote]);

    // Keep selected note synchronized after notes update
    useEffect(() => {
        if (!selectedNote) {
            return;
        }

        const updatedSelectedNote = notes.find(
            (note) => note.id === selectedNote.id
        );

        if (updatedSelectedNote) {
            setSelectedNote(updatedSelectedNote);
        }
    }, [notes, selectedNote?.id]);

    const handleGenerate = (payload) => {
        generateNotes(payload, {
            onSuccess: (response) => {
                if (response?.data) {
                    setSelectedNote(response.data);
                }
            },
        });
    };

    const handleDelete = (id) => {
        deleteNote(id, {
            onSuccess: () => {
                if (selectedNote?.id === id) {
                    const remaining = notes.filter(
                        (note) => note.id !== id
                    );

                    setSelectedNote(remaining[0] ?? null);
                }

                setDeleteDialog(false);
            },
        });
    };

    const handleRename = (newTitle) => {
        if (!selectedNote?.id) {
            return;
        }

        updateNote(
            {
                id: selectedNote.id,
                payload: {
                    title: newTitle,
                },
            },
            {
                onSuccess: (response) => {
                    const updatedNote = response?.data;

                    if (updatedNote) {
                        setSelectedNote(updatedNote);
                    } else {
                        setSelectedNote((current) =>
                            current
                                ? {
                                      ...current,
                                      title: newTitle,
                                  }
                                : current
                        );
                    }

                    toast.success(
                        response?.message || "Note renamed successfully."
                    );

                    setRenameDialog(false);
                },
                onError: (error) => {
                    toast.error(
                        error?.response?.data?.message ||
                            "Unable to rename note."
                    );
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1700px]">

                {/* Page Header */}
                <header className="mb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <Sparkles size={14} />
                                AI Learning Tools
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                                AI Notes
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                                Generate, organize and review your AI-powered
                                study notes in one place.
                            </p>
                        </div>

                        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <FileText size={18} />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Saved notes
                                </p>

                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {notes.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Workspace */}
                <div
                    className="
                        grid gap-5
                        xl:grid-cols-[280px_minmax(360px,430px)_minmax(0,1fr)]
                        lg:grid-cols-[260px_minmax(330px,1fr)]
                    "
                >
                    {/* History */}
                    <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
                        <NotesHistory
                            notes={notes}
                            selectedNote={selectedNote}
                            onSelect={setSelectedNote}
                            isLoading={isLoading}
                        />
                    </aside>

                    {/* Generator */}
                    <section className="min-w-0">
                        <NotesForm
                            onGenerate={handleGenerate}
                            isGenerating={isGenerating}
                        />
                    </section>

                    {/* Preview */}
                    <section className="min-w-0 xl:sticky xl:top-6 xl:self-start">
                        <div className="space-y-4">
                            <NotesToolbar
                                note={selectedNote}
                                onDelete={() => setDeleteDialog(true)}
                                onEdit={() => setRenameDialog(true)}
                            />

                            {isLoading ? (
                                <LoadingSkeleton />
                            ) : selectedNote ? (
                                <NotesEditor note={selectedNote} />
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    </section>
                </div>
            </div>

            {/* Delete Dialog */}
            <DeleteNoteDialog
                open={deleteDialog}
                note={selectedNote}
                loading={isDeleting}
                onCancel={() => setDeleteDialog(false)}
                onConfirm={handleDelete}
            />

            {/* Rename Dialog */}
            <RenameNoteModal
                open={renameDialog}
                note={selectedNote}
                loading={isUpdating}
                onClose={() => setRenameDialog(false)}
                onConfirm={handleRename}
            />
        </div>
    );
}