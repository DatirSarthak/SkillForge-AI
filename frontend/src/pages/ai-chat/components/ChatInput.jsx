import { SendHorizontal } from "lucide-react";

import { useRef, useState } from "react";

const ChatInput = ({ onSend, sending }) => {

    const [message, setMessage] = useState("");

    const textareaRef = useRef(null);

    const handleSend = async () => {

        if (!message.trim()) return;

        await onSend(message);

        setMessage("");

    };

    return (

        <div className="border-t border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">

            <div className="flex items-end gap-3">

                <textarea

                    ref={textareaRef}

                    rows={1}

                    value={message}

                    onChange={(e) => {

                        setMessage(e.target.value);

                        textareaRef.current.style.height = "auto";

                        textareaRef.current.style.height =
                            textareaRef.current.scrollHeight + "px";

                    }}

                    placeholder="Message SkillForge AI..."

                    className="
max-h-52
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

dark:border-slate-700
dark:bg-slate-800
dark:text-white
dark:placeholder:text-slate-400
"

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {

                            e.preventDefault();

                            handleSend();

                        }

                    }}

                />

                <button

                    disabled={sending}

                    onClick={handleSend}

                    className="
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
disabled:opacity-60
disabled:cursor-not-allowed
"

                >

                    <SendHorizontal size={20} />

                </button>

            </div>

        </div>

    );

};

export default ChatInput;