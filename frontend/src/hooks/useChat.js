import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import aiChatService from "../services/aiChatService";

const useChat = () => {

    const [loading, setLoading] = useState(false);

    const [sending, setSending] = useState(false);

    const [conversations, setConversations] = useState(null);

    const [selectedConversation, setSelectedConversation] = useState(null);

    const loadConversations = async () => {

        try {

            setLoading(true);

            const response =
                await aiChatService.getConversations();

            setConversations(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load conversations.");

        } finally {

            setLoading(false);

        }

    };

    const loadConversation = async (conversationId) => {

        try {

            const response =
                await aiChatService.getConversation(conversationId);

            setSelectedConversation(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load conversation.");

        }

    };

    const sendMessage = async (message) => {

        try {

            setSending(true);

            const payload = {

                conversationId:

                    selectedConversation?.id,

                message

            };

            const response =
                await aiChatService.sendMessage(payload);

            setSelectedConversation(

                response.data.data.conversation

            );

            await loadConversations();

        } catch (error) {

            console.error(error);

            toast.error("Failed to send message.");

        } finally {

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

            await loadConversations();

            if (

                selectedConversation?.id ===

                conversationId

            ) {

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

        try {

            await aiChatService.deleteConversation(

                conversationId

            );

            if (

                selectedConversation?.id ===

                conversationId

            ) {

                setSelectedConversation(null);

            }

            await loadConversations();

            toast.success(

                "Conversation deleted."

            );

        } catch (error) {

            console.error(error);

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

        deleteConversation

    };

};

export default useChat;