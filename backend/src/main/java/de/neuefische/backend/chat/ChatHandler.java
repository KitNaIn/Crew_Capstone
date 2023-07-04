package de.neuefische.backend.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final List<Message> messages = new ArrayList<>();
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(messages)));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Message m = new Message();

        Principal principal = session.getPrincipal();
        if (principal != null) {
            m.setUserName(principal.getName());
        }
        String payload = message.getPayload();
        MessageDto messageDto = this.objectMapper.readValue(payload, MessageDto.class);

        m.setMessage(messageDto.getMessage());

        m.setTimeStamp(new Date().toString());

        m.setMessageId(UUID.randomUUID().toString());

        messages.add(m);
        broadcast(m);
    }

    void broadcast(Message message) throws IOException {
        for (WebSocketSession s : sessions) {
            String text = this.objectMapper.writeValueAsString(message);
            s.sendMessage(new TextMessage(text));
        }
    }
}