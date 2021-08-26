import React, { useEffect, useState } from 'react';
import { AppStateType } from '../redux/store';
import {
    Avatar,
    Button,
    Col,
    Input,
    List,
    Row
} from 'antd';
import { ChatMessageApiType } from '../api/chat-api';
import { selectIsAuth } from '../redux/auth-selector';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../redux/chat-reducer';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const { TextArea } = Input

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
                <Row>
                    <Col style={{ maxWidth: '800px' }} md={24} sm={24} xs={24}>
                        <Messages />
                    </Col>
                </Row>
                <AddMessageForm />
            </>
        </div>
    );
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [hasMore, setHasMore] = useState(false);
    const handleInfiniteOnLoad = () => {
        if (messages.length >= 100) {
            setHasMore(false)
            return;
        }
    }
    return (
        <div>
            <div className="chat-container">
                <InfiniteScroll
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    height={400}
                    inverse={true}
                    dataLength={messages.length}
                    loader={null}
                    hasMore={hasMore}
                    next={handleInfiniteOnLoad}
                >
                    <List
                        size='default'
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape='square' src={item.photo} />}
                                    title={item.userName}
                                    description={item.message}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    )
}

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
            <div style={{ margin: '10px 0', maxWidth: '500px' }}>
                <TextArea
                    onPressEnter={sendMessageHandler}
                    allowClear
                    rows={2}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                /></div>
            <div>
                <Button
                    type='primary'
                    disabled={status !== 'ready' || isAuth === false}
                    onClick={sendMessageHandler}
                >
                    Send</Button>
            </div>
        </div>
    );
}

export default ChatPage;
