package com.skillforge.service;

import java.util.function.Consumer;

public interface AiProvider {

    String generateResponse(String prompt);

    String generateConversationTitle(String message);

    void streamResponse(String prompt, Consumer<String> onChunk);
}