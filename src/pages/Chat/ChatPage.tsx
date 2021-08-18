import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket
        function createChannel() {
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', () => {
                console.log('Close ws')
                setTimeout(createChannel, 3000)
            })
            setWsChannel(ws)
        }
        createChannel()
        return () => {
            ws.close()
        }
    }, []);

    useEffect(() => {
        wsChannel?.addEventListener('close', () => {
            console.log('Close ws')
        })
    }, [wsChannel]);

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    );
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        wsChannel?.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [wsChannel]);

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m): any => <Message key={uuidv4()} message={m} />)}
        </div>
    );
}


const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img style={{ height: '30px' }} src={message.photo} alt='' />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    );
}


const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState<string>('');
    const [isReady, setIsReady] = useState<'pending' | 'ready'>('pending');
    const sendMessage = () => {
        if (!message) { return }
        wsChannel?.send(message)
        setMessage('')
    }

    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setIsReady('ready')
        })
    }, [wsChannel])
    return (
        <div>
            <div><textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            ></textarea></div>
            <div><Button
                disabled={isReady !== 'ready'}
                onClick={sendMessage}
            >Send</Button></div>
        </div>
    );
}

export default ChatPage;


