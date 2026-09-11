import { useState } from "react";

import {
    Copy,
    Check
} from "lucide-react";

import toast from "react-hot-toast";

import { Prism as SyntaxHighlighter }
    from "react-syntax-highlighter";

import { oneDark }
    from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({
    language,
    value
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);

            setCopied(true);

            toast.success("Code copied");

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy code:",
                error
            );

            toast.error("Failed to copy code");
        }
    };

    return (
        <div
            className="
                my-5
                w-full
                min-w-0
                max-w-full
                overflow-hidden
                rounded-xl
                border
                border-slate-700
            "
        >
            {/* Code Header */}
            <div
                className="
                    flex
                    w-full
                    min-w-0
                    items-center
                    justify-between
                    gap-3
                    bg-slate-900
                    px-3
                    py-2
                    sm:px-4
                "
            >
                <span
                    className="
                        min-w-0
                        truncate
                        text-sm
                        text-slate-300
                    "
                >
                    {language || "text"}
                </span>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1
                        text-sm
                        text-slate-300
                        transition
                        hover:bg-slate-800
                        hover:text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-slate-500
                    "
                >
                    {copied ? (
                        <Check size={16} />
                    ) : (
                        <Copy size={16} />
                    )}

                    <span>
                        {copied ? "Copied" : "Copy"}
                    </span>
                </button>
            </div>

            {/* Scrollable Code Area */}
            <div
                className="
                    w-full
                    min-w-0
                    max-w-full
                    overflow-x-auto
                    overflow-y-hidden
                "
            >
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    PreTag="div"
                    showLineNumbers={true}
                    wrapLongLines={false}
                    customStyle={{
                        margin: 0,
                        width: "max-content",
                        minWidth: "100%",
                        maxWidth: "none",
                        boxSizing: "border-box"
                    }}
                    codeTagProps={{
                        style: {
                            whiteSpace: "pre",
                            wordBreak: "normal",
                            overflowWrap: "normal"
                        }
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;