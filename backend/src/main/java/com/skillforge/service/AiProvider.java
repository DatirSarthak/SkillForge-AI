package com.skillforge.service;

public interface AiProvider {

    String generateResponse(String prompt);
    String generateConversationTitle(String message);

}