import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import aiNotesService from "../services/aiNotesService";
import { NOTE_MESSAGES } from "../constants/notesConstants";

export default function useAiNotes() {
    const queryClient = useQueryClient();

    // Fetch all notes
    const {
        data: notes = [],
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["ai-notes"],
        queryFn: aiNotesService.getAllNotes,
        select: (response) => response?.data ?? [],
    });

    // Generate note
    const generateMutation = useMutation({
        mutationFn: aiNotesService.generateNotes,

        onSuccess: (response) => {
            toast.success(
                response?.message || NOTE_MESSAGES.GENERATE_SUCCESS
            );

            queryClient.invalidateQueries({
                queryKey: ["ai-notes"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    NOTE_MESSAGES.GENERATE_FAILED
            );
        },
    });

    // Update note
    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            aiNotesService.updateNote(id, payload),

        onSuccess: (response) => {
            toast.success(
                response?.message || NOTE_MESSAGES.UPDATE_SUCCESS
            );

            queryClient.invalidateQueries({
                queryKey: ["ai-notes"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    NOTE_MESSAGES.UPDATE_FAILED
            );
        },
    });

    // Delete note
    const deleteMutation = useMutation({
        mutationFn: aiNotesService.deleteNote,

        onSuccess: (response) => {
            toast.success(
                response?.message || NOTE_MESSAGES.DELETE_SUCCESS
            );

            queryClient.invalidateQueries({
                queryKey: ["ai-notes"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                    NOTE_MESSAGES.DELETE_FAILED
            );
        },
    });

    return {
        notes,
        error,
        isLoading,
        isFetching,

        // Generate
        generateNotes: generateMutation.mutate,
        isGenerating: generateMutation.isPending,

        // Update
        updateNote: updateMutation.mutate,
        updateNoteAsync: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,

        // Delete
        deleteNote: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
}