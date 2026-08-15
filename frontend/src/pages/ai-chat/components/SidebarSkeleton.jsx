import { motion } from "framer-motion";

const SidebarSkeleton = () => {

    return (

        <div className="space-y-3 p-4">

            {

                Array.from({ length: 8 }).map((_, index) => (

                    <motion.div

                        key={index}

                        className="
h-14
rounded-xl
bg-gradient-to-r
from-slate-700
via-slate-600
to-slate-700
"

                        animate={{
                            opacity: [0.4, 1, 0.4]
                        }}

                        transition={{
                            duration: 1.6,
                            repeat: Infinity
                        }}

                    />

                ))

            }

        </div>

    );

};

export default SidebarSkeleton;