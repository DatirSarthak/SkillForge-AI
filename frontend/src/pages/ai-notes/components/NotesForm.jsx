import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Sparkles, Loader2 } from "lucide-react";

import { notesSchema } from "../../../utils/notesValidation";
import { NOTE_TYPES } from "../../../constants/notesConstants";

export default function NotesForm({
    onGenerate,
    isGenerating = false,
}) {
    const {
    register,
    handleSubmit,
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


    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20">
                    <FileText size={24} />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Generate Notes
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Turn any topic into structured AI-powered study notes.
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
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="note-prompt"
                            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                        >
                            Topic / Prompt
                        </label>

                        <span className="text-xs text-slate-400">
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
                <div>
                    <label
                        htmlFor="note-type"
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                        Note Type
                    </label>

                    <select
                        id="note-type"
                        disabled={isGenerating}
                        {...register("noteType")}
                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${
                            errors.noteType
                                ? "border-red-500"
                                : ""
                        }`}
                    >
                        {NOTE_TYPES.map((type) => (
                            <option
                                key={type.value}
                                value={type.value}
                            >
                                {type.label}
                            </option>
                        ))}
                    </select>

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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01] hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
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