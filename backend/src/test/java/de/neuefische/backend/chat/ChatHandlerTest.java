package de.neuefische.backend.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.mock;

class ChatHandlerTest {

    @Test
    void afterConnectionEstablishedShouldAddSessionAndSendMessages() throws Exception {
        //GIVEN
        ArrayList<WebSocketSession> sessions = new ArrayList<>();
        CloseStatus closeStatus = CloseStatus.NORMAL;

        ChatHandler chatHandler = new ChatHandler(sessions, new ArrayList<>(), new ObjectMapper());

        //WHEN
        WebSocketSession session = mock(WebSocketSession.class);
        chatHandler.afterConnectionEstablished(session);

        //THEN
        assertEquals(1, sessions.size(), "The session should be added");
    }

    @Test
    void afterConnectionClosed_ShouldRemoveSession() {
        //GIVEN
        ArrayList<WebSocketSession> sessions = new ArrayList<>();
        WebSocketSession session = mock(WebSocketSession.class);
        sessions.add(session);
        CloseStatus closeStatus = CloseStatus.NORMAL;

        ChatHandler chatHandler = new ChatHandler(sessions, new ArrayList<>(), new ObjectMapper());

        //WHEN
        chatHandler.afterConnectionClosed(session, closeStatus);

        //THEN
        assertEquals(0, sessions.size(), "The session should be removed");
    }
    @Test
    void handleTextMessage() throws Exception {
        //GIVEN
        ArrayList<WebSocketSession> sessions = new ArrayList<>();
        WebSocketSession session = mock(WebSocketSession.class);
        sessions.add(session);

        ArrayList<Message> messages = new ArrayList<>();
        ChatHandler chatHandler = new ChatHandler(sessions, messages, new ObjectMapper());
        String payload = "{\"message\": \"this is a test\"}";

        //WHEN
        chatHandler.handleTextMessage(session, new TextMessage(payload));

        //THEN
        assertEquals(1, messages.size(), "The messages should include exactly 1 entry");
        assertEquals("this is a test",
                messages.get(0).getMessage(),
                "The message should have the exact same payload");
        assertNotEquals("", messages.get(0).getMessageId());
    }
}

