package de.neuefische.backend.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class ChatHandlerTest {
    private ChatHandler chatHandler;
    private List<WebSocketSession> sessions;
    private List<Message> messages;
    @Mock
    private WebSocketSession session;
    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        sessions = new ArrayList<>();
        messages = new ArrayList<>();
        chatHandler = new ChatHandler(objectMapper);
    }

    @Test
    void afterConnectionEstablishedShouldAddSessionAndSendMessages() throws Exception {

    }

    @Test
    void afterConnectionClosed_ShouldRemoveSession() {
        //GIVEN
        WebSocketSession session = mock(WebSocketSession.class);
        CloseStatus closeStatus = CloseStatus.NORMAL;
        List<WebSocketSession> sessions = new ArrayList<>();
        sessions.add(session);

        ChatHandler chatHandler = new ChatHandler(new ObjectMapper());

        //WHEN
        chatHandler.afterConnectionClosed(session, closeStatus);
        sessions.remove(session);

        //THEN
        assertEquals(0, sessions.size(), "The session should be removed");
    }


    @Test
    void handleTextMessage() throws Exception {

    }
    

}
