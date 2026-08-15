import { motion } from "framer-motion";

const TypingIndicator = () => {

    return (

        <div className="mb-6 flex">

            <div className="rounded-2xl bg-white
dark:bg-slate-800
border
border-slate-200
dark:border-slate-700 px-5 py-4 shadow">

                <div className="flex gap-2">

                    {

                        [0, 1, 2].map((i) => (

                            <motion.div

                                key={i}

                                className="h-2.5 w-2.5 rounded-full bg-blue-500"

                                animate={{

                                    y: [0, -8, 0]

                                }}

                                transition={{

                                    repeat: Infinity,

                                    duration: 0.8,

                                    delay: i * 0.2

                                }}

                            />

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default TypingIndicator;