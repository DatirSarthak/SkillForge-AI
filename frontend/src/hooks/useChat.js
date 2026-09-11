import {
    useEffect,
    useRef,
    useState,
} from "react";

import toast from "react-hot-toast";

import aiChatService from "../services/aiChatService";

const useChat = () => {
    const [loading, setLoading] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [conversations, setConversations] =
        useState(null);

    const [selectedConversation, setSelectedConversation] =
        useState(null);

    /*
     * Stores already loaded conversations.
     *
     * Map is used instead of state because the cache
     * does not directly control UI rendering.
     *
     * Example:
     * conversationId -> complete conversation
     */
    const conversationCacheRef =
        useRef(new Map());

    const loadConversations = async () => {
        try {
            setLoading(true);

            const response =
                await aiChatService.getConversations();

            setConversations(
                response.data.data
            );

        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to load conversations."
            );

        } finally {
            setLoading(false);
        }
    };

    const loadConversation = async (
        conversationId
    ) => {
        try {
            const cacheKey =
                String(conversationId);

            /*
             * If conversation is already loaded,
             * switch immediately without API call.
             */
            const cachedConversation =
                conversationCacheRef.current.get(
                    cacheKey
                );

            if (cachedConversation) {
                setSelectedConversation(
                    cachedConversation
                );

                return;
            }

            /*
             * First time opening this conversation.
             */
            const response =
                await aiChatService.getConversation(
                    conversationId
                );

            const conversation =
                response.data.data;

            /*
             * Save complete conversation
             * for future instant switching.
             */
            conversationCacheRef.current.set(
                cacheKey,
                conversation
            );

            setSelectedConversation(
                conversation
            );

        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to load conversation."
            );
        }
    };

    const sendMessage = async (message) => {
        try {
            setSending(true);

            const payload = {
                conversationId:
                    selectedConversation?.id,
                message,
            };

            /*
             * Temporary user message.
             *
             * This gives the user immediate UI feedback
             * before the backend response arrives.
             */
            const temporaryUserMessage = {
                id: `temp-user-${Date.now()}`,
                sender: "USER",
                message,
                createdAt:
                    new Date().toISOString(),
            };

            /*
             * Temporary AI message.
             *
             * Streaming chunks will progressively
             * update this message.
             */
            const temporaryAiMessage = {
                id: `streaming-ai-${Date.now()}`,
                sender: "AI",
                message: "",
                createdAt:
                    new Date().toISOString(),
            };

            /*
             * Immediately show temporary messages.
             */
            setSelectedConversation(
                (currentConversation) => {
                    /*
                     * New conversation.
                     */
                    if (!currentConversation) {
                        return {
                            id: null,
                            title:
                                message
                                    .trim()
                                    .slice(0, 50),

                            messages: [
                                temporaryUserMessage,
                                temporaryAiMessage,
                            ],
                        };
                    }

                    /*
                     * Existing conversation.
                     */
                    return {
                        ...currentConversation,

                        messages: [
                            ...(currentConversation.messages ||
                                []),

                            temporaryUserMessage,
                            temporaryAiMessage,
                        ],
                    };
                }
            );

            let streamedText = "";
            let pendingText = "";

            let pendingAnimationFrame =
                null;

            /*
             * Stores the conversation returned
             * by the SSE done event.
             *
             * We only store the ID here.
             *
             * After streaming finishes, the actual
             * persisted conversation is fetched from
             * the backend.
             */
            let completedConversationId =
                null;

            /*
             * Throttle streaming UI updates using
             * requestAnimationFrame.
             *
             * This prevents React from rendering
             * excessively for every tiny SSE chunk.
             */
            const updateStreamingMessage = () => {
                if (
                    pendingAnimationFrame !==
                    null
                ) {
                    return;
                }

                pendingAnimationFrame =
                    requestAnimationFrame(() => {
                        pendingAnimationFrame =
                            null;

                        const textToRender =
                            pendingText;

                        setSelectedConversation(
                            (
                                currentConversation
                            ) => {
                                if (
                                    !currentConversation
                                ) {
                                    return currentConversation;
                                }

                                return {
                                    ...currentConversation,

                                    messages: (
                                        currentConversation.messages ||
                                        []
                                    ).map(
                                        (msg) =>
                                            msg.id ===
                                                temporaryAiMessage.id
                                                ? {
                                                    ...msg,
                                                    message:
                                                        textToRender,
                                                }
                                                : msg
                                    ),
                                };
                            }
                        );
                    });
            };

            /*
             * Start AI streaming.
             */
            await aiChatService.streamMessage(
                payload,
                {
                    onChunk: (chunk) => {
                        if (!chunk) {
                            return;
                        }

                        streamedText += chunk;

                        pendingText =
                            streamedText;

                        updateStreamingMessage();
                    },

                    onDone: (response) => {
                        /*
                         * Cancel any pending animation
                         * frame because the final backend
                         * conversation will replace the
                         * temporary message.
                         */
                        if (
                            pendingAnimationFrame !==
                            null
                        ) {
                            cancelAnimationFrame(
                                pendingAnimationFrame
                            );

                            pendingAnimationFrame =
                                null;
                        }

                        /*
                         * Support the possible response
                         * nesting formats.
                         */
                        const conversation =
                            response?.conversation ??
                            response?.data
                                ?.conversation ??
                            response?.data
                                ?.data
                                ?.conversation;

                        if (
                            !conversation?.id
                        ) {
                            console.warn(
                                "AI stream completed but no conversation ID was returned:",
                                response
                            );

                            return;
                        }

                        /*
                         * Store only the ID.
                         *
                         * The complete conversation will
                         * be fetched after streamMessage()
                         * finishes.
                         */
                        completedConversationId =
                            conversation.id;
                    },
                }
            );

            /*
             * ------------------------------------------------
             * STREAM COMPLETED
             * ------------------------------------------------
             *
             * Now that streamMessage() has completely
             * finished, fetch the canonical conversation
             * from the backend.
             *
             * This is the important fix.
             */
            if (completedConversationId) {
                const latestResponse =
                    await aiChatService.getConversation(
                        completedConversationId
                    );

                const latestConversation =
                    latestResponse?.data?.data;

                if (!latestConversation) {
                    throw new Error(
                        "Conversation could not be loaded after AI stream completion."
                    );
                }

                const conversationId =
                    String(
                        latestConversation.id
                    );

                /*
                 * Update conversation cache.
                 */
                conversationCacheRef.current.set(
                    conversationId,
                    latestConversation
                );

                /*
                 * Replace temporary UI conversation
                 * with the real persisted conversation.
                 */
                setSelectedConversation(
                    latestConversation
                );

                /*
                 * Update sidebar immediately.
                 *
                 * If it is a new conversation,
                 * add it to the beginning.
                 *
                 * If it already exists,
                 * replace the old version.
                 */
                setConversations(
                    (currentConversations) => {
                        const current =
                            currentConversations ||
                            [];

                        const exists =
                            current.some(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                    conversationId
                            );

                        if (exists) {
                            return current.map(
                                (item) =>
                                    String(
                                        item.id
                                    ) ===
                                        conversationId
                                        ? latestConversation
                                        : item
                            );
                        }

                        return [
                            latestConversation,
                            ...current,
                        ];
                    }
                );
            }

        } catch (error) {
            console.error(
                "Failed to send message:",
                error
            );

            /*
             * Remove temporary messages when
             * streaming/request fails.
             */
            setSelectedConversation(
                (currentConversation) => {
                    if (
                        !currentConversation
                    ) {
                        return currentConversation;
                    }

                    return {
                        ...currentConversation,

                        messages: (
                            currentConversation.messages ||
                            []
                        ).filter(
                            (msg) =>
                                !String(
                                    msg.id
                                ).startsWith(
                                    "temp-user-"
                                ) &&
                                !String(
                                    msg.id
                                ).startsWith(
                                    "streaming-ai-"
                                )
                        ),
                    };
                }
            );

            toast.error(
                error?.message || "Failed to send message."
            );

        } finally {
            /*
             * Important:
             *
             * sending becomes false only after
             * the final conversation has been
             * fetched and UI state has been updated.
             */
            setSending(false);
        }
    };

    const renameConversation = async (
        conversationId,
        title
    ) => {
        try {
            await aiChatService.renameConversation(
                conversationId,
                title
            );

            toast.success(
                "Conversation renamed."
            );

            /*
             * Refresh sidebar conversation titles.
             */
            await loadConversations();

            /*
             * Refresh currently selected conversation
             * only when necessary.
             */
            if (
                String(
                    selectedConversation?.id
                ) === String(conversationId)
            ) {
                /*
                 * Remove stale cached version first.
                 */
                conversationCacheRef.current.delete(
                    String(conversationId)
                );

                await loadConversation(
                    conversationId
                );
            }

        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to rename conversation."
            );
        }
    };

    const deleteConversation = async (
        conversationId
    ) => {
        /*
         * Keep previous sidebar state so that
         * we can rollback if deletion fails.
         */
        const previousConversations =
            conversations;

        const cacheKey =
            String(conversationId);

        /*
         * Keep cached conversation for rollback.
         */
        const cachedConversation =
            conversationCacheRef.current.get(
                cacheKey
            );

        try {
            /*
             * Optimistic sidebar update.
             *
             * Conversation disappears immediately.
             */
            setConversations(
                (current) =>
                    (current || []).filter(
                        (conversation) =>
                            String(
                                conversation.id
                            ) !== cacheKey
                    )
            );

            /*
             * Clear selected conversation immediately.
             */
            if (
                selectedConversation &&
                String(
                    selectedConversation.id
                ) === cacheKey
            ) {
                setSelectedConversation(
                    null
                );
            }

            /*
             * Delete from backend.
             */
            await aiChatService.deleteConversation(
                conversationId
            );

            /*
             * Remove deleted conversation
             * from frontend cache.
             */
            conversationCacheRef.current.delete(
                cacheKey
            );

            toast.success(
                "Conversation deleted."
            );

        } catch (error) {
            console.error(
                "Failed to delete conversation:",
                error
            );

            /*
             * Rollback sidebar.
             */
            setConversations(
                previousConversations
            );

            /*
             * Restore cache if it existed.
             */
            if (cachedConversation) {
                conversationCacheRef.current.set(
                    cacheKey,
                    cachedConversation
                );
            }

            toast.error(
                "Failed to delete conversation."
            );
        }
    };

    useEffect(() => {
        loadConversations();
    }, []);

    return {
        loading,
        sending,
        conversations,
        selectedConversation,
        setSelectedConversation,
        loadConversation,
        sendMessage,
        renameConversation,
        deleteConversation,
    };
};

export default useChat;