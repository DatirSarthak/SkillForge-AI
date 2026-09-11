import { SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";

const ChatInput = ({ onSend, sending }) => {
    const [message, setMessage] = useState("");

    const textareaRef = useRef(null);

    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || sending) {
            return;
        }

        /*
         * Clear the input immediately.
         *
         * The user message is already added immediately
         * inside useChat before AI streaming begins.
         */
        setMessage("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        await onSend(trimmedMessage);
    };

    return (
        <div
            className="
                border-t
                border-slate-200
                bg-white
                p-4
                sm:p-5
                dark:border-slate-700
                dark:bg-slate-900
            "
        >
            <div className="flex items-end gap-2 sm:gap-3">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={message}
                    disabled={sending}
                    onChange={(event) => {
                        setMessage(event.target.value);

                        if (textareaRef.current) {
                            textareaRef.current.style.height =
                                "auto";

                            textareaRef.current.style.height =
                                `${textareaRef.current.scrollHeight}px`;
                        }
                    }}
                    placeholder="Message SkillForge AI..."
                    className="
                        max-h-52
                        min-h-[52px]
                        flex-1
                        resize-none
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-300
                        bg-white
                        p-4
                        outline-none
                        transition

                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200

                        disabled:cursor-not-allowed
                        disabled:opacity-60

                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-white
                        dark:placeholder:text-slate-400
                    "
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            !event.shiftKey
                        ) {
                            event.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <button
                    type="button"
                    disabled={
                        sending || !message.trim()
                    }
                    onClick={handleSend}
                    aria-label="Send message"
                    className="
                        shrink-0
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        p-4
                        text-white
                        shadow
                        transition
                        duration-300

                        hover:scale-105
                        hover:shadow-lg

                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-400
                        focus:ring-offset-2

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        disabled:hover:scale-100

                        dark:focus:ring-blue-500
                        dark:focus:ring-offset-slate-900
                    "
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;