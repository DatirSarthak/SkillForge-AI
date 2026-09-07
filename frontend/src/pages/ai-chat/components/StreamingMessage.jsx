import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

const StreamingMessage = ({ text }) => {
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
                        const match =
                            /language-(\w+)/.exec(
                                className || ""
                            );

                        if (!inline && match) {
                            return (
                                <CodeBlock
                                    language={match[1]}
                                    value={String(
                                        children
                                    ).replace(
                                        /\n$/,
                                        ""
                                    )}
                                />
                            );
                        }

                        return (
                            <code
                                className="
                                    rounded-md
                                    bg-slate-200
                                    px-1.5
                                    py-0.5
                                    font-mono
                                    text-sm
                                    dark:bg-slate-700
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
                                    className="
                                        w-full
                                        border-collapse
                                    "
                                    {...props}
                                />
                            </div>
                        );
                    },

                    a(props) {
                        return (
                            <a
                                className="
                                    text-blue-600
                                    underline
                                    dark:text-blue-400
                                "
                                target="_blank"
                                rel="noreferrer"
                                {...props}
                            />
                        );
                    },
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
};

export default memo(StreamingMessage);