import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    Sparkles,
    Loader2,
    ChevronDown,
    Check,
} from "lucide-react";

import { notesSchema } from "../../../utils/notesValidation";
import { NOTE_TYPES } from "../../../constants/notesConstants";

export default function NotesForm({
    onGenerate,
    isGenerating = false,
}) {
    const [typeOpen, setTypeOpen] = useState(false);
    const typeDropdownRef = useRef(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(notesSchema),
        defaultValues: {
            title: "",
            prompt: "",
            noteType: "DETAILED",
        },
    });

    const prompt = watch("prompt", "");

    const onSubmit = (data) => {
        onGenerate(data);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                typeDropdownRef.current &&
                !typeDropdownRef.current.contains(event.target)
            ) {
                setTypeOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // Close dropdown with Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setTypeOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20">
                    <FileText size={24} />
                </div>

                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Generate Notes
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Turn any topic into structured AI-powered study
                        notes.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Title */}
                <div>
                    <label
                        htmlFor="note-title"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                        Note Title
                    </label>

                    <input
                        id="note-title"
                        type="text"
                        placeholder="e.g. Spring Boot Architecture"
                        disabled={isGenerating}
                        {...register("title")}
                        className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white ${
                            errors.title
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-700"
                        }`}
                    />

                    {errors.title && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Prompt */}
                <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <label
                            htmlFor="note-prompt"
                            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                            Topic / Prompt
                        </label>

                        <span className="shrink-0 text-xs text-slate-400">
                            {prompt.length}/5000
                        </span>
                    </div>

                    <textarea
                        id="note-prompt"
                        rows={7}
                        maxLength={5000}
                        placeholder="Example: Explain Spring Boot architecture, its main layers, dependency injection, and important interview points."
                        disabled={isGenerating}
                        {...register("prompt")}
                        className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white ${
                            errors.prompt
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-700"
                        }`}
                    />

                    {errors.prompt && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.prompt.message}
                        </p>
                    )}
                </div>

                {/* Note Type */}
                <div ref={typeDropdownRef} className="relative">
                    <label
                        htmlFor="note-type"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                        Note Type
                    </label>

                    <Controller
                        name="noteType"
                        control={control}
                        render={({ field }) => {
                            const selectedType =
                                NOTE_TYPES.find(
                                    (type) =>
                                        type.value === field.value
                                );

                            return (
                                <>
                                    {/* Hidden form field for accessibility */}
                                    <input
                                        id="note-type"
                                        type="hidden"
                                        value={field.value || ""}
                                        readOnly
                                    />

                                    {/* Trigger */}
                                    <button
                                        type="button"
                                        disabled={isGenerating}
                                        onClick={() =>
                                            setTypeOpen(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        aria-haspopup="listbox"
                                        aria-expanded={typeOpen}
                                        className={`flex w-full items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-left text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-950 ${
                                            errors.noteType
                                                ? "border-red-500 focus:ring-red-500/20"
                                                : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-700"
                                        }`}
                                    >
                                        <span className="truncate text-slate-900 dark:text-white">
                                            {selectedType?.label ||
                                                "Select note type"}
                                        </span>

                                        <ChevronDown
                                            size={17}
                                            className={`ml-3 shrink-0 text-slate-400 transition-transform ${
                                                typeOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    {typeOpen && !isGenerating && (
                                        <div
                                            role="listbox"
                                            aria-label="Note Type"
                                            className="
                                                absolute
                                                left-0
                                                right-0
                                                z-50
                                                mt-2
                                                max-h-60
                                                overflow-y-auto
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                p-1
                                                shadow-xl
                                                dark:border-slate-700
                                                dark:bg-slate-900
                                            "
                                        >
                                            {NOTE_TYPES.map((type) => {
                                                const isSelected =
                                                    type.value ===
                                                    field.value;

                                                return (
                                                    <button
                                                        key={
                                                            type.value
                                                        }
                                                        type="button"
                                                        role="option"
                                                        aria-selected={
                                                            isSelected
                                                        }
                                                        onClick={() => {
                                                            field.onChange(
                                                                type.value
                                                            );
                                                            setTypeOpen(
                                                                false
                                                            );
                                                        }}
                                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                                                            isSelected
                                                                ? "bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                                : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                                                        }`}
                                                    >
                                                        <span>
                                                            {
                                                                type.label
                                                            }
                                                        </span>

                                                        {isSelected && (
                                                            <Check
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    />

                    {errors.noteType && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.noteType.message}
                        </p>
                    )}
                </div>

                {/* Generate */}
                <button
                    type="submit"
                    disabled={isGenerating}
                    className="
                        flex w-full items-center justify-center gap-2
                        rounded-xl
                        bg-gradient-to-r from-emerald-500 to-green-600
                        px-5 py-3.5
                        text-sm font-bold text-white
                        shadow-lg shadow-emerald-500/20
                        transition
                        hover:scale-[1.01]
                        hover:shadow-emerald-500/30
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        disabled:hover:scale-100
                    "
                >
                    {isGenerating ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Generating Notes...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate Notes
                        </>
                    )}
                </button>
            </form>
        </section>
    );
}