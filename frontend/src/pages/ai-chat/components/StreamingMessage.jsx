import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

const StreamingMessage = ({
    text,
    speed = 8
}) => {

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {

        let index = 0;

        const interval = setInterval(() => {

            setDisplayedText(text.slice(0, index + 1));

            index++;

            if (index >= text.length) {
                clearInterval(interval);
            }

        }, speed);

        return () => clearInterval(interval);

    }, [text, speed]);

    return (

        <div
            className="
prose
prose-slate
dark:prose-invert
max-w-none
leading-8
"
        >

            <ReactMarkdown

                remarkPlugins={[remarkGfm]}

                components={{

                    code({
                        inline,
                        className,
                        children,
                        ...props
                    }) {

                        const match = /language-(\w+)/.exec(className || "");

                        if (!inline && match) {

                            return (
                                <CodeBlock
                                    language={match[1]}
                                    value={String(children).replace(/\n$/, "")}
                                />
                            );

                        }

                        return (
                            <code
                                className="
rounded-md
bg-slate-200
dark:bg-slate-700
px-1.5
py-0.5
font-mono
text-sm
"
                                {...props}
                            >
                                {children}
                            </code>
                        );

                    },

                    table(props) {

                        return (

                            <div className="overflow-x-auto">

                                <table
                                    className="w-full border-collapse"
                                    {...props}
                                />

                            </div>

                        );

                    },

                    a(props) {

                        return (

                            <a
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noreferrer"
                                {...props}
                            />

                        );

                    }

                }}

            >

                {displayedText}

            </ReactMarkdown>

        </div>

    );

};

export default StreamingMessage;