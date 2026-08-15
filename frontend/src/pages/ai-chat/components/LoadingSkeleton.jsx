import { motion } from "framer-motion";

const LoadingSkeleton = () => {

    return (

        <div className="space-y-5 px-6 py-8">

            {

                [...Array(6)].map((_, index) => (

                    <div
                        key={index}
                        className={`
            h-20
            rounded-3xl
            bg-gradient-to-r
            from-slate-200
            via-slate-100
            to-slate-200
            dark:from-slate-800
            dark:via-slate-700
            dark:to-slate-800
            animate-pulse
            ${index % 2 === 0
                                ? "w-2/3"
                                : "ml-auto w-1/2"
                            }
        `}
                    />

                ))

            }

        </div>

    );

};

export default LoadingSkeleton;