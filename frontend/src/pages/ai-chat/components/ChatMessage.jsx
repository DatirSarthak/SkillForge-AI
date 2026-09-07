import { useState, memo } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
    Bot,
    User,
    Copy,
    Check,
} from "lucide-react";

import StreamingMessage from "./StreamingMessage";

const ChatMessage = memo(({ message }) => {
    const [copied, setCopied] = useState(false);

    const isUser = message.sender === "USER";

    const isStreaming =
        String(message.id).startsWith("streaming-ai-");

    const hasMessage =
        Boolean(message.message?.trim());

    const copyMessage = async () => {
        if (!hasMessage) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                message.message
            );

            toast.success("Copied to clipboard");

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy message:",
                error
            );

            toast.error(
                "Failed to copy message."
            );
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 15,
                scale: 0.98,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className={`mb-6 flex gap-4 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            {!isUser && (
                <div className="mt-1">
                    <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        shadow
                        dark:bg-blue-500
                    ">
                        <Bot size={20} />
                    </div>
                </div>
            )}

            <div
                className={`
                    relative
                    max-w-[95%]
                    rounded-3xl
                    px-6
                    py-5
                    shadow-md
                    transition-all
                    duration-300
                    sm:max-w-[90%]
                    md:max-w-[80%]
                    hover:-translate-y-1
                    hover:shadow-xl

                    ${
                        isUser
                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white"
                            : "border border-slate-200 bg-white text-slate-800 backdrop-blur dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    }
                `}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap">
                        {message.message}
                    </p>
                ) : isStreaming && !hasMessage ? (
                    <div className="
                        flex
                        items-center
                        gap-1.5
                        py-1
                    ">
                        <span className="
                            h-2.5
                            w-2.5
                            animate-bounce
                            rounded-full
                            bg-blue-500
                        " />

                        <span className="
                            h-2.5
                            w-2.5
                            animate-bounce
                            rounded-full
                            bg-blue-500
                            [animation-delay:150ms]
                        " />

                        <span className="
                            h-2.5
                            w-2.5
                            animate-bounce
                            rounded-full
                            bg-blue-500
                            [animation-delay:300ms]
                        " />
                    </div>
                ) : (
                    <StreamingMessage
                        text={message.message}
                    />
                )}

                {hasMessage && (
                    <div className="mt-4 flex items-center justify-between">
                        <small className="
                            text-[10px]
                            tracking-wide
                            text-slate-400
                            dark:text-slate-500
                        ">
                            {message.createdAt
                                ? new Date(
                                    message.createdAt
                                ).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )
                                : ""}
                        </small>

                        <button
                            type="button"
                            onClick={copyMessage}
                            className={`
                                flex
                                items-center
                                gap-1
                                rounded-lg
                                px-2
                                py-1
                                transition-all
                                duration-200
                                hover:scale-105

                                ${
                                    isUser
                                        ? "hover:bg-white/20"
                                        : "hover:bg-slate-200 dark:hover:bg-slate-700"
                                }
                            `}
                        >
                            {copied ? (
                                <Check size={16} />
                            ) : (
                                <Copy size={16} />
                            )}

                            {copied
                                ? "Copied"
                                : "Copy"}
                        </button>
                    </div>
                )}
            </div>

            {isUser && (
                <div className="mt-1">
                    <div className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        shadow
                        md:h-10
                        md:w-10
                    ">
                        <User size={20} />
                    </div>
                </div>
            )}
        </motion.div>
    );
});

export default ChatMessage;