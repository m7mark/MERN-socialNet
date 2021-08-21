import { Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageApiType } from '../api/chat-api';
import { selectIsAuth } from '../redux/auth-selector';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../redux/chat-reducer';
import { AppStateType } from '../redux/store';

const { TextArea } = Input;

export type ChatMessageType = ChatMessageApiType & { id: string }
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
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const el = e.currentTarget
        if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
            !isAutoScroll && setIsAutoScroll(true);
        }
        else { isAutoScroll && setIsAutoScroll(false) }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages]);
    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m): any => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
}


const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <div>
            <img style={{ height: '30px' }} src={message.photo} alt='' />
            <b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    );
})


const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState<string>('');
    const status = useSelector((state: AppStateType) => state.chat.status)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) { return }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div style={{ margin: '10px 0', width: 'max-content' }}><TextArea
                onPressEnter={sendMessageHandler}
                allowClear
                rows={2}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            /></div>
            <div><Button
                disabled={status !== 'ready' || isAuth === false}
                onClick={sendMessageHandler}
            >Send</Button></div>
        </div>
    );
}

export default ChatPage;


