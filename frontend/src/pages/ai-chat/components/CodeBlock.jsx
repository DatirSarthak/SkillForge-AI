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

        await navigator.clipboard.writeText(value);

        setCopied(true);

        toast.success("Code copied");

        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };

    return (

        <div className="my-5 overflow-hidden rounded-xl border">

            <div className="flex items-center justify-between bg-slate-900 px-4 py-2">

                <span className="text-sm text-slate-300">

                    {language || "text"}

                </span>

                <button

                    onClick={handleCopy}

                    className="flex items-center gap-1 text-sm text-slate-300 hover:text-white"

                >

                    {

                        copied

                            ? <Check size={16} />

                            : <Copy size={16} />

                    }

                    {

                        copied

                            ? "Copied"

                            : "Copy"

                    }

                </button>

            </div>

            <SyntaxHighlighter

                language={language}

                style={oneDark}

                PreTag="div"

                showLineNumbers={true}
                wrapLongLines={true}

            >

                {value}

            </SyntaxHighlighter>

        </div>

    );

};

export default CodeBlock;