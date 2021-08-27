import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Login } from './LoginPage';
import { NavBar } from '../components/UI/AdaptiveMenu/Navbar';
import { SideBar } from '../components/UI/AdaptiveMenu/Sider';
import { TopicMenu } from '../components/UI/AdaptiveMenu/TopicMenu';
import { UsersPage } from './UsersPage';
import { withSuspense } from '../hoc/withSuspense';
import {
    Redirect,
    Route,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { UserOutlined, MessageOutlined, TeamOutlined, CommentOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectAuthId } from '../redux/auth-selector';

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const SuspenseProfile = withSuspense(ProfilePage)
const SuspenseDialogs = withSuspense(DialogsContainer)
const SuspenseChatPage = withSuspense(ChatPage)

export type MenuItemsType = typeof menuItems
const { Content } = Layout;
const menuItems = [
    { title: "Profile", icon: <UserOutlined /> },
    { title: "Messages", icon: <MessageOutlined /> },
    { title: "Friends", icon: <TeamOutlined /> },
    { title: "Chat", icon: <CommentOutlined /> }];


export const AppMainPage: React.FC = () => {

    const [contentIndex, setContentIndex] = useState<number | null>(0);
    const [selectedKey, setSelectedKey] = useState<string>("0");
    const authorizedUserId = useSelector(selectAuthId)
    // const userId = useSelector(selectUserId)
    const changeSelectedKey = (event: { key: string }) => {
        const key = event.key;
        setSelectedKey(key);
        setContentIndex(+key);
    };
    const Menu = (
        <TopicMenu
            menuItems={menuItems}
            selectedKey={selectedKey}
            changeSelectedKey={changeSelectedKey}
        />)
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/profile')) { setSelectedKey('0'); setContentIndex(null) }
    }, [location.pathname]);

    useEffect(() => {
        switch (contentIndex) {
            case 0: history.push(`/profile/${authorizedUserId}`); break;
            case 1: history.push("/messages"); break;
            case 2: history.push("/users"); break;
            case 3: history.push("/chat"); break;
            default: break;
        }
    }, [contentIndex]);
    return (
        <div className='site-layout'>
            <NavBar menu={Menu} />
            <Layout>
                <SideBar menu={Menu} />
                <Layout.Content className={"site-layout-background site-main-content"}>
                    <Content >
                        <Route path='/' render={() => <Redirect to={'/profile'} />} />
                        <Route path='/profile/:userId?' render={() => <SuspenseProfile />} />
                        <Route path='/messages' render={() => <SuspenseDialogs />} />
                        <Route path='/chat' render={() => <SuspenseChatPage />} />
                        <Route path='/users' render={() => <UsersPage pageTitle={"Самураи"} />} />
                        <Route path='/login' render={() => <Login />} />
                    </Content>
                </Layout.Content>
            </Layout>
        </div>
    )
}
