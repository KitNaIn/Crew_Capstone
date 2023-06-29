import React, { useState, ChangeEvent } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './group-chat.tsx.css';

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
                <div key={index+1}>{message}</div>
            ))}
            <div className="input-and-send">
                <input placeholder="Type here..." className="input" value={text} onChange={handleTextChange}/>
                <button className="cta" onClick={sendChatMessage}>
                    <span> Send</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </div>
        </>
    );
}

export default GroupChat;
