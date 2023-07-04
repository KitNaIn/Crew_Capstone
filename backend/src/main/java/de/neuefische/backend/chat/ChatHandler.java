package de.neuefische.backend.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final List<Message> messages = new ArrayList<>();
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
//        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(messages)));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Message m = new Message();
        String payload = message.getPayload();
        messages.add(m);
        broadcast(payload);
    }

    void broadcast(String message) throws IOException {
        for (WebSocketSession s : sessions) {
            s.sendMessage(new TextMessage(message));
        }
    }
}