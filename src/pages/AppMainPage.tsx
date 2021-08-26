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

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const SuspenseProfile = withSuspense(ProfilePage)
const SuspenseDialogs = withSuspense(DialogsContainer)
const SuspenseChatPage = withSuspense(ChatPage)
const { Content } = Layout;

export const AppMainPage: React.FC = () => {
    const topics = ["Profile", "Messages", "Friends", "Chat"];
    const [contentIndex, setContentIndex] = useState(0);
    const [selectedKey, setSelectedKey] = useState("0");
    const changeSelectedKey = (event: { key: string }) => {
        const key = event.key;
        setSelectedKey(key);
        setContentIndex(+key);
    };
    const Menu = (
        <TopicMenu
            topics={topics}
            selectedKey={selectedKey}
            changeSelectedKey={changeSelectedKey}
        />)
    const history = useHistory();
    // const location = useLocation();
    // if (location.pathname.includes('/profile/') && selectedKey !== '0') { setSelectedKey('0') }
    useEffect(() => {
        switch (contentIndex) {
            case 0: history.push("/profile"); break;
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
