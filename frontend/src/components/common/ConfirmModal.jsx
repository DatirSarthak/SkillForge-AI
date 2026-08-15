import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel
}) => {

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"

                    >

                        <motion.div

                            initial={{
                                scale: 0.9,
                                opacity: 0
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1
                            }}

                            exit={{
                                scale: 0.9,
                                opacity: 0
                            }}

                            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"

                        >

                            <div className="flex items-center gap-3">

                                <AlertTriangle

                                    size={30}

                                    className="text-red-500"

                                />

                                <h2 className="text-xl font-semibold">

                                    {title}

                                </h2>

                            </div>

                            <p className="mt-4 text-gray-600">

                                {message}

                            </p>

                            <div className="mt-8 flex justify-end gap-3">

                                <button

                                    onClick={onCancel}

                                    className="rounded-lg border px-5 py-2"

                                >

                                    {cancelText}

                                </button>

                                <button

                                    onClick={onConfirm}

                                    className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"

                                >

                                    {confirmText}

                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

};

export default ConfirmModal;