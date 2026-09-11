import {
    useEffect,
    useRef,
    useState,
} from "react";

import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import ScrollToBottomButton from "./ScrollToBottomButton";
import LoadingSkeleton from "./LoadingSkeleton";

const ChatWindow = ({
    conversation,
    sending,
    loading,
}) => {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const [showScrollButton, setShowScrollButton] =
        useState(false);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const messages =
        conversation?.messages || [];

    const lastMessage =
        messages[messages.length - 1];

    useEffect(() => {
        if (!messages.length) {
            return;
        }

        const element = containerRef.current;

        if (!element) {
            return;
        }

        const distance =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight;

        const isNearBottom = distance < 250;

        if (isNearBottom) {
            bottomRef.current?.scrollIntoView({
                behavior: "auto",
            });
        }
    }, [
        messages.length,
        lastMessage?.message,
    ]);

    const handleScroll = () => {
        const element =
            containerRef.current;

        if (!element) {
            return;
        }

        const distance =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight;

        setShowScrollButton(
            distance > 250
        );
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (conversation === undefined) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                        <div
                            className="
                                h-8
                                w-8
                                animate-spin
                                rounded-full
                                border-4
                                border-blue-500
                                border-t-transparent
                            "
                        />

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Loading conversation...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!conversation) {
        return <EmptyState />;
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="
                relative
                min-w-0
                w-full
                flex-1
                overflow-y-auto
                overflow-x-hidden
                bg-gradient-to-b
                from-slate-50
                via-slate-100
                to-white
                px-4
                py-8
                dark:from-slate-950
                dark:via-slate-900
                dark:to-black
                md:px-8
                lg:px-10
            "
        >
            {messages.length === 0 && (
                <div
                    className="
                        py-16
                        text-center
                        text-slate-400
                        dark:text-slate-500
                    "
                >
                    Start your conversation with
                    SkillForge AI 🚀
                </div>
            )}

            <div className="min-w-0 w-full max-w-full space-y-5">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            <div ref={bottomRef} />

            <ScrollToBottomButton
                visible={showScrollButton}
                onClick={scrollToBottom}
            />
        </div>
    );
};

export default ChatWindow;