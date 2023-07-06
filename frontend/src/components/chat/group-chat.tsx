import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {addMessage} from './chatRedux/actionCreators';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import './group-chat.tsx.css';
import axios from "axios";


function GroupChat() {
    const [text, setText] = useState('');
    const dispatch: Dispatch<any> = useDispatch();
    const messages: MessageDto[] = useSelector(
        (state: ChatState) => state.messages,
        shallowEqual
    )
    const [userName, setUserName] = useState('');

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get('/api/user/me');
                setUserName(response.data.username);
            } catch (error) {
                console.error('Error fetching userId: ', error);
            }
        })();
    }, []);

    const { sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080/api/chat', {
        onMessage: (event) => {
            if (event.data.startsWith("[") && event.data.length > 1 && event.data.charAt(1) !== "]") {
                JSON.parse(event.data)
                    .forEach((messageDto: MessageDto) => {
                        const addMessageAction = addMessage(messageDto);
                        dispatch(addMessageAction);
                    })
            } else {
                const messageDto: MessageDto = JSON.parse(event.data);
                const addMessageAction = addMessage(messageDto);
                dispatch(addMessageAction);
            }
        },
    });

    const sendChatMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({ message: text });
            setText('');
        }
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    function checkAuthor(message: MessageDto) {
        return message.userName === userName;
    }


    return (
        <>
            <h1 className="header">Crew Chat</h1>
            { messages && <div className="chat-container">
                {messages.slice().reverse().map((m) => (
                    <div key={m.messageId} className={checkAuthor(m) ? 'sent-message' : 'received-message'}>
                        <div className="message-bubble">
                            <small>{m.userName}</small>
                            <div>{m.message}</div>
                            <div className="timestamp">{m.timeStamp}</div>
                        </div>
                    </div>
                ))}
            </div>}
            <div className="input-and-send">
                <input placeholder="Type here..." className="input" value={text} onChange={handleTextChange}  />
                <button className="cta" onClick={(event) => sendChatMessage(event)}>
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