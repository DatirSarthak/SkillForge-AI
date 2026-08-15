import api from "./api";

const BASE_URL = "/ai";

const aiChatService = {

    sendMessage: (payload) =>
        api.post(`${BASE_URL}/chat`, payload),

    getConversations: () =>
        api.get(`${BASE_URL}/conversations`),

    getConversation: (conversationId) =>
        api.get(`${BASE_URL}/conversations/${conversationId}`),

    deleteConversation: (conversationId) =>
        api.delete(`${BASE_URL}/conversations/${conversationId}`),

    renameConversation: (conversationId, title) =>
    api.put(
        `/ai/conversations/${conversationId}/rename`,
        {
            title
        }
    ),

};

export default aiChatService;