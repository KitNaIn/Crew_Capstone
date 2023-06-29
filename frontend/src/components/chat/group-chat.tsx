import React, { useState, ChangeEvent } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function GroupChat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState('');

    const { sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080/api/ws/chat', {
        onMessage: (event) => {
            const receivedMessage = JSON.parse(event.data).message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        },
    });

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const sendChatMessage = () => {
        if (readyState === ReadyState.OPEN) {
            const messageObject = { message: text };
            sendJsonMessage(messageObject);
            setText('');
        }
    };

    return (
        <>
            <h1>Chat</h1>
            {messages.map((message, index) => (
                <div key={index}>{message}</div>
            ))}
            <input type="text" value={text} onChange={handleTextChange} />
            <button onClick={sendChatMessage} type="button">Send</button>
        </>
    );
}

export default GroupChat;
