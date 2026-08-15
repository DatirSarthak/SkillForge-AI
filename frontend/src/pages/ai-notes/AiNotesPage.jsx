import { useEffect, useState } from "react";

import useAiNotes from "../../hooks/useAiNotes";

import NotesForm from "./components/NotesForm";
import NotesHistory from "./components/NotesHistory";
import NotesEditor from "./components/NotesEditor";
import NotesToolbar from "./components/NotesToolbar";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";
import DeleteNoteDialog from "./components/DeleteNoteDialog";

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

    /*
     * Keep selected note synchronized with
     * the latest notes returned by React Query.
     */
    useEffect(() => {
        if (notes.length === 0) {
            setSelectedNote(null);
            return;
        }

        if (!selectedNote) {
            setSelectedNote(notes[0]);
            return;
        }

        const updatedSelectedNote = notes.find(
            (note) => note.id === selectedNote.id
        );

        if (updatedSelectedNote) {
            setSelectedNote(updatedSelectedNote);
        } else {
            setSelectedNote(notes[0]);
        }
    }, [notes, selectedNote]);

    /*
     * Generate new note
     */
    const handleGenerate = (payload) => {
        generateNotes(payload, {
            onSuccess: (response) => {
                if (response?.data) {
                    setSelectedNote(response.data);
                }
            },
        });
    };

    /*
     * Update note title
     */
    const handleEdit = (updateData) => {
        // Cancel edit
        if (!updateData) {
            return;
        }

        const { id, payload } = updateData;

        updateNote(
            {
                id,
                payload,
            },
            {
                onSuccess: (response) => {
                    if (response?.data) {
                        setSelectedNote(response.data);
                    }
                },
            }
        );
    };

    /*
     * Delete note
     */
    const handleDelete = (id) => {
        deleteNote(id, {
            onSuccess: () => {
                if (selectedNote?.id === id) {
                    const remainingNotes = notes.filter(
                        (note) => note.id !== id
                    );

                    setSelectedNote(
                        remainingNotes.length > 0
                            ? remainingNotes[0]
                            : null
                    );
                }

                setDeleteDialog(false);
            },
        });
    };

    return (
        <>
            <div className="grid gap-6 lg:grid-cols-12">

                {/* =========================
                    LEFT — NOTES HISTORY
                ========================== */}

                <div className="lg:col-span-3">
                    <NotesHistory
                        notes={notes}
                        selectedNote={selectedNote}
                        onSelect={setSelectedNote}
                        isLoading={isLoading}
                    />
                </div>

                {/* =========================
                    CENTER — GENERATOR
                ========================== */}

                <div className="space-y-6 lg:col-span-4">
                    <NotesForm
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                    />
                </div>

                {/* =========================
                    RIGHT — NOTE PREVIEW
                ========================== */}

                <div className="space-y-4 lg:col-span-5">

                    <NotesToolbar
                        note={selectedNote}
                        onDelete={() => setDeleteDialog(true)}
                        onEdit={handleEdit}
                        isUpdating={isUpdating}
                    />

                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : selectedNote ? (
                        <NotesEditor
                            note={selectedNote}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>

            {/* =========================
                DELETE CONFIRMATION
            ========================== */}

            <DeleteNoteDialog
                open={deleteDialog}
                note={selectedNote}
                loading={isDeleting}
                onCancel={() => setDeleteDialog(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}