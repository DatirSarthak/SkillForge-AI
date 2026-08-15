import { z } from "zod";

import { NOTE_LIMITS, NOTE_TYPES } from "../constants/notesConstants";

const noteTypeValues = NOTE_TYPES.map((type) => type.value);

export const notesSchema = z.object({
    title: z
        .string()
        .trim()
        .min(
            NOTE_LIMITS.TITLE_MIN_LENGTH,
            `Title must be at least ${NOTE_LIMITS.TITLE_MIN_LENGTH} characters.`
        )
        .max(
            NOTE_LIMITS.TITLE_MAX_LENGTH,
            `Title must not exceed ${NOTE_LIMITS.TITLE_MAX_LENGTH} characters.`
        ),

    prompt: z
        .string()
        .trim()
        .min(
            NOTE_LIMITS.PROMPT_MIN_LENGTH,
            `Prompt must be at least ${NOTE_LIMITS.PROMPT_MIN_LENGTH} characters.`
        )
        .max(
            NOTE_LIMITS.PROMPT_MAX_LENGTH,
            `Prompt must not exceed ${NOTE_LIMITS.PROMPT_MAX_LENGTH} characters.`
        ),

    noteType: z
        .string()
        .refine(
            (value) => noteTypeValues.includes(value),
            {
                message: "Please select a valid note type.",
            }
        ),
});