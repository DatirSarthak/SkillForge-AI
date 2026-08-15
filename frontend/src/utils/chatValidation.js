import { MAX_MESSAGE_LENGTH } from "../constants/chatConstants";

export const validateMessage = (message) => {

    const value = message.trim();

    if (!value)
        return "Message cannot be empty.";

    if (value.length > MAX_MESSAGE_LENGTH)
        return `Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`;

    return null;
};