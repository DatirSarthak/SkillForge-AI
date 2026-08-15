const ConversationSkeleton = () => {

    return (

        <div className="animate-pulse space-y-3 p-5">

            {

                [...Array(8)].map((_, index) => (

                    <div

                        key={index}

                        className="
h-14
rounded-xl
bg-slate-700/70
border
border-slate-600
"

                    />

                ))

            }

        </div>

    );

};

export default ConversationSkeleton;