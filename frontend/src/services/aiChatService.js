import api, {
    getAccessToken,
    refreshAccessToken,
    clearAuthData,
} from "./api";

const BASE_URL = "/ai";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const createStreamUrl = () => {
    return `${API_BASE_URL}${BASE_URL}/chat/stream`;
};

const aiChatService = {

    streamMessage: async (payload, { onChunk, onDone } = {}) => {
        let accessToken = getAccessToken();

        const makeRequest = async (token) =>
            fetch(createStreamUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });

        let response = await makeRequest(accessToken);

        // Refresh token once if access token expired
        if (response.status === 401) {
            try {
                accessToken = await refreshAccessToken();
                response = await makeRequest(accessToken);
            } catch (error) {
                clearAuthData();
                throw error;
            }
        }

        if (!response.ok) {
            throw new Error(
                `AI stream request failed with status ${response.status}.`
            );
        }

        if (!response.body) {
            throw new Error("Streaming response body is not available.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let buffer = "";
        let receivedDoneEvent = false;

        const processEvent = (event) => {
            if (!event.trim()) {
                return;
            }

            const lines = event.split(/\r?\n/);

            let eventType = "message";
            const dataLines = [];

            for (const line of lines) {
                if (line.startsWith("event:")) {
                    eventType = line.substring(6).trim();
                } else if (line.startsWith("data:")) {
                    dataLines.push(line.substring(5).trim());
                }
            }

            const data = dataLines.join("\n");

            if (!data) {
                return;
            }

            let parsedData;

            try {
                parsedData = JSON.parse(data);
            } catch (error) {
                console.error("Failed to parse SSE JSON:", data, error);
                throw new Error("Invalid AI streaming response.");
            }

            switch (eventType) {
                case "chunk":
                    onChunk?.(parsedData.text || "");
                    break;

                case "done":
                    receivedDoneEvent = true;
                    onDone?.(parsedData);
                    break;

                case "error":
                    throw new Error(
                        parsedData.message || "AI streaming failed."
                    );

                default:
                    break;
            }
        };

        while (true) {
            const { value, done } = await reader.read();

            if (done) {
                buffer += decoder.decode();
                break;
            }

            buffer += decoder.decode(value, {
                stream: true,
            });

            // Handles both LF and CRLF SSE line endings
            const events = buffer.split(/\r?\n\r?\n/);

            buffer = events.pop() || "";

            for (const event of events) {
                processEvent(event);
            }
        }

        if (buffer.trim()) {
            processEvent(buffer);
        }

        if (!receivedDoneEvent) {
            throw new Error(
                "AI stream ended before completion."
            );
        }
    },

    getConversations: () =>
        api.get(`${BASE_URL}/conversations`),

    getConversation: (conversationId) =>
        api.get(
            `${BASE_URL}/conversations/${conversationId}`
        ),

    deleteConversation: (conversationId) =>
        api.delete(
            `${BASE_URL}/conversations/${conversationId}`
        ),

    renameConversation: (
        conversationId,
        title
    ) =>
        api.put(
            `${BASE_URL}/conversations/${conversationId}/rename`,
            {
                title,
            }
        ),
};

export default aiChatService;