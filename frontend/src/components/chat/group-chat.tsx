import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './chatRedux/chatAction';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './group-chat.tsx.css';

interface RootState {
    messages: { text: string; sent: boolean; timestamp: string }[];
}

function GroupChat() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.messages);

    const formatTimestamp = (date: Date) => {
        return date.toLocaleString(undefined, { minute: 'numeric', hour: 'numeric', hour12: false });
    };

    const { sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080/api/ws/chat', {
        onMessage: (event) => {
            const receivedMessage = JSON.parse(event.data).message;
            const timestamp = formatTimestamp(new Date());
            dispatch(addMessage({ text: receivedMessage, sent: false, timestamp }));
        },
    });

    const sendChatMessage = () => {
        if (readyState === ReadyState.OPEN) {
            const messageObject = { text, sent: true, timestamp: formatTimestamp(new Date()) };
            dispatch(addMessage(messageObject));
            sendJsonMessage({ message: text });
            setText('');
        }
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <>
            <h1 className="header">Crew Chat</h1>
            <div className="chat-container">
                {messages.slice().reverse().map((message, index) => (
                    <div key={index + 1} className={message.sent ? 'sent-message' : 'received-message'}>
                        <div className="message-bubble">
                            <div>{message.text}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-and-send">
                <input placeholder="Type here..." className="input" value={text} onChange={handleTextChange} />
                <button className="cta" onClick={sendChatMessage}>
                    <span>Send</span>
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
