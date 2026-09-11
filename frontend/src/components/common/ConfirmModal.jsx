import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        px-4
                        py-6
                        backdrop-blur-sm
                    "
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{
                            scale: 0.95,
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            scale: 0.95,
                            opacity: 0,
                            y: 10,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            w-full
                            max-w-sm
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-2xl

                            sm:max-w-md
                            sm:p-6

                            dark:border-slate-700
                            dark:bg-slate-900
                        "
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-100
                                    dark:bg-red-500/10
                                "
                            >
                                <AlertTriangle
                                    size={22}
                                    className="text-red-500"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2
                                    className="
                                        text-lg
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    {title}
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    {message}
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                mt-6
                                flex
                                flex-col-reverse
                                gap-3

                                sm:flex-row
                                sm:justify-end
                            "
                        >
                            <button
                                type="button"
                                onClick={onCancel}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-slate-300

                                    sm:w-auto

                                    dark:border-slate-700
                                    dark:bg-slate-800
                                    dark:text-slate-200
                                    dark:hover:bg-slate-700
                                    dark:focus:ring-slate-600
                                "
                            >
                                {cancelText}
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                className="
                                    w-full
                                    rounded-xl
                                    bg-red-600
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-red-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-red-300
                                    focus:ring-offset-2

                                    sm:w-auto

                                    dark:focus:ring-red-500
                                    dark:focus:ring-offset-slate-900
                                "
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;