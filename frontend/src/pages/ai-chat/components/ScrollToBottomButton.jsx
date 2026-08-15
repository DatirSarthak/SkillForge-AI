import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToBottomButton = ({

    visible,

    onClick

}) => {

    return (

        <AnimatePresence>

            {

                visible && (

                    <motion.button

                        initial={{
                            opacity: 0,
                            y: 25,
                            scale: 0.8
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}

                        exit={{

                            opacity: 0,

                            y: 20

                        }}

                        onClick={onClick}

                        className="
absolute
bottom-6
right-6
z-20
rounded-full
bg-gradient-to-r
from-blue-600
to-indigo-600
p-3
text-white
shadow-xl
transition
duration-300
hover:scale-110
hover:shadow-2xl
"

                    >

                        <ChevronDown size={22} />

                    </motion.button>

                )

            }

        </AnimatePresence>

    );

};

export default ScrollToBottomButton;