import {
    FileText,
    Sparkles,
    ArrowRight,
} from "lucide-react";

export default function EmptyState() {
    return (
        <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FileText size={30} />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                    No Note Selected
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Select an existing note from your history or generate
                    a new AI-powered note to get started.
                </p>

                {/* Hint */}
                <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                    <Sparkles
                        size={15}
                        className="text-emerald-500"
                    />

                    <span>
                        Your generated notes will appear here.
                    </span>
                </div>

                {/* Visual hint */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Select a note from history</span>

                    <ArrowRight size={14} />
                </div>
            </div>
        </div>
    );
}