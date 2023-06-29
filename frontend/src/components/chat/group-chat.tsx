import React, { useState, ChangeEvent } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './group-chat.tsx.css';

function GroupChat() {
    const [messages, setMessages] = useState<{ text: string; sent: boolean; timestamp: string }[]>([]);
    const [text, setText] = useState('');

    const { sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080/api/ws/chat', {
        onMessage: (event) => {
            const receivedMessage = JSON.parse(event.data).message;
            const timestamp = new Date().toLocaleString();
            setMessages((prevMessages) => [...prevMessages, { text: receivedMessage, sent: false, timestamp }]);
        },
    });


    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const sendChatMessage = () => {
        if (readyState === ReadyState.OPEN) {
            const messageObject = { message: text };
            sendJsonMessage(messageObject);
            const timestamp = new Date().toLocaleString();
            setMessages((prevMessages) => [...prevMessages, { text, sent: true, timestamp }]);
            setText('');
        }
    };

    return (
        <>
            <h1 style={{ backgroundColor:"lightblue", display:"flex", justifyContent:"center",} }>Crew Chat</h1>
            <div className="chat-container">
                {messages.slice().reverse().map((message, index) => (
                    <div
                        key={index + 1}
                        className={message.sent ? 'sent-message' : 'received-message'}
                    >
                        <div className="message-bubble">
                            <div>{message.text}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    </div>
                ))}
            </div>
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
