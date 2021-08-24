import React, { useState } from 'react';
import { AppHeader } from '../components/UI/Header/AppHeader';
import {
    Col,
    Layout,
    Menu,
    Row
} from 'antd';
import { Login } from './LoginPage';
import { Users } from '../components/Users/Users';
import { withSuspense } from '../hoc/withSuspense';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    MessageOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {
    Link,
    Redirect,
    Route,
} from 'react-router-dom';

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const SuspenseProfile = withSuspense(ProfilePage)
const SuspenseDialogs = withSuspense(DialogsContainer)
const SuspenseChatPage = withSuspense(ChatPage)

const { Header, Sider, Content } = Layout;

export const AppMainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout id="components-layout-custom-trigger">
            <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth='0'>
                <div className="logo"></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/profile" replace>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<MessageOutlined />}>
                        <Link to="/messages" replace>Messages</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<TeamOutlined />}>
                        <Link to="/users" replace>Friends</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<TeamOutlined />}>
                        <Link to="/chat" replace>Chat</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Row>
                    <Col flex="50px">
                        <Header className="site-layout-background" style={{
                            padding: 0
                        }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: toggle
                            })}
                        </Header>
                    </Col>
                    <Col flex="auto"><AppHeader /></Col>
                </Row>
                <Content className={"site-layout-background site-main-content"}>
                    <Route path='/' render={() => <Redirect to={'/profile'} />} />
                    <Route path='/profile/:userId?' render={() => <SuspenseProfile />} />
                    <Route path='/messages' render={() => <SuspenseDialogs />} />
                    <Route path='/chat' render={() => <SuspenseChatPage />} />
                    <Route path='/users' render={() => <Users pageTitle={"Самураи"} />} />
                    <Route path='/login' render={() => <Login />} />
                </Content>
                {
                    /* <Footer></Footer> */
                }
            </Layout>
        </Layout>
    )
}
