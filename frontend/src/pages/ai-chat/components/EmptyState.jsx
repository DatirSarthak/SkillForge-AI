import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = () => {

    return (

        <div className="flex flex-1 items-center justify-center bg-gradient-to-br
from-slate-50
via-white
to-blue-100
dark:from-slate-950
dark:via-slate-900
dark:to-slate-950">

            <motion.div

                className="max-w-lg px-6 text-center"

                initial={{ opacity: 0, scale: 0.95 }}

                animate={{ opacity: 1, scale: 1 }}

                transition={{ duration: 0.3 }}

            >

                <Sparkles

                    size={72}

                    className="mx-auto mb-6 text-blue-600"

                />

                <h1 className="
text-5xl
font-black
tracking-tight
bg-gradient-to-r
from-blue-600
to-indigo-600
bg-clip-text
text-transparent
">
                    SkillForge AI
                </h1>

                <p className="mt-4 max-w-md text-slate-500 dark:text-slate-400">

                    Start a new conversation.

                    Ask coding questions,

                    generate notes,

                    prepare interviews,

                    build roadmaps,

                    or learn anything with AI.

                </p>

                <div className="mt-8 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 p-5 shadow-sm">

                    <p className="text-sm text-slate-500 dark:text-slate-400">

                        💡 Try asking:

                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">

                        <span className="rounded-full
bg-gradient-to-r
from-blue-600
to-indigo-600
px-4
py-2
text-white
shadow-md
transition
hover:scale-105">

                            Resume Review

                        </span>

                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">

                            AI Quiz

                        </span>

                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">

                            Roadmap

                        </span>

                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">

                            Interview Prep

                        </span>

                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">

                        <li>• Explain Java Multithreading</li>

                        <li>• Create a React learning roadmap</li>

                        <li>• Review my resume</li>

                        <li>• Generate interview questions</li>

                    </ul>

                </div>

            </motion.div>

        </div>

    );

};

export default EmptyState;