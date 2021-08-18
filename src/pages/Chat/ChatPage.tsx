import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        < Chat />
    );
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            let newMessages =JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, []);

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m): any => <Message key={uuidv4()} message={m} />)}
            Messages
        </div>
    );
}


const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img style= {{height:'30px'}} src={message.photo} alt='' /> <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    );
}


const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        if (!message) {return}
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <div><textarea 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            ></textarea></div>
            <div><Button onClick={sendMessage}>Send</Button></div>
        </div>
    );
}

export default ChatPage;


