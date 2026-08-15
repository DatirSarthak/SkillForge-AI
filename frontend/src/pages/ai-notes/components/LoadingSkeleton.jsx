export default function LoadingSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="animate-pulse border-b border-slate-200 p-6 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-800" />

                    <div className="flex-1">
                        <div className="h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-3 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="animate-pulse space-y-4 p-6">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-10/12 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-9/12 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-24 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-4 w-8/12 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
        </div>
    );
}