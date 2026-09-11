import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

const StreamingMessage = ({ text }) => {
    return (
        <div
            className="
                min-w-0
                max-w-full
                leading-8
                w-full
            "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    /*
                     * ReactMarkdown normally wraps fenced code
                     * inside a <pre> element.
                     *
                     * CodeBlock already provides its own container,
                     * so removing the extra <pre> wrapper prevents
                     * mobile layout and whitespace conflicts.
                     */
                    pre({ children }) {
                        return <>{children}</>;
                    },

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
                            <div
                                className="
                                    max-w-full
                                    overflow-x-auto
                                "
                            >
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