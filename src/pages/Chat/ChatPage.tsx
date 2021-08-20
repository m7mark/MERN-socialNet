import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/store';


export type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string
}
const ChatPage: React.FC = () => {
    return (
        < Chat />
    )
}

const Chat: React.FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, []);
    return (
        <div>
            {status === 'error' && <div>SOME ERROR </div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    );
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
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


const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState<string>('');
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) { return }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div><textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            ></textarea></div>
            <div><Button
                disabled={status !== 'ready'}
                onClick={sendMessageHandler}
            >Send</Button></div>
        </div>
    );
}

export default ChatPage;


