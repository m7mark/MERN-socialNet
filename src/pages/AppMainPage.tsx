import React, { useEffect, useState } from 'react';
import { CommentOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Login } from './LoginPage';
import { NavBar } from '../components/UI/AdaptiveMenu/Navbar';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
  } from 'react-router-dom';
import { selectAuthId } from '../redux/auth-selector';
import { SideBar } from '../components/UI/AdaptiveMenu/Sider';
import { TopicMenu } from '../components/UI/AdaptiveMenu/TopicMenu';
import { UsersPage } from './UsersPage';
import { useSelector } from 'react-redux';
import { withSuspense } from '../hoc/withSuspense';


const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const ChatPage = React.lazy(() => import('../pages/ChatPage'));
const SuspenseProfile = withSuspense(ProfilePage)
const SuspenseChatPage = withSuspense(ChatPage)

export type MenuItemsType = typeof menuItems
const { Content } = Layout;
const menuItems = [
  { title: "Profile", icon: <UserOutlined /> },
  { title: "Friends", icon: <TeamOutlined /> },
  { title: "Chat", icon: <CommentOutlined /> }];


export const AppMainPage: React.FC = () => {

  const [navKey, setNavKey] = useState<number | null>(0);
  const [selectedKey, setSelectedKey] = useState<string>("0");
  const authorizedUserId = useSelector(selectAuthId)

  const changeSelectedKey = (event: { key: string }) => {
    const key = event.key;
    setSelectedKey(key);
    setNavKey(+key);
  };
  const Menu = (
    <TopicMenu
      menuItems={menuItems}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />)
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/profile')) { setSelectedKey('0'); setNavKey(null) }
    if (location.pathname.includes('/users')) { setSelectedKey('1'); setNavKey(null) }
    if (location.pathname.includes('/chat')) { setSelectedKey('2'); setNavKey(null) }
  }, [location.pathname]);

  useEffect(() => {
    switch (navKey) {
      case 0: authorizedUserId
        ? navigate(`/profile/${authorizedUserId}`)
        : navigate(`/login`);
        break;
      case 1: navigate("/users"); break;
      case 2: authorizedUserId
        ? navigate("/chat")
        : navigate(`/login`); break;
      default: break;
    }
  }, [navKey, authorizedUserId, navigate]);
  return (
    <div className='site-layout'>
      <NavBar selectedKey={selectedKey} menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className={"site-layout-background site-main-content"}>
          <Content >
            <Routes>
              <Route path='/' element={<Navigate to={'/profile'} />} />
              <Route path='/profile' element={<SuspenseProfile />}>
                <Route path='/profile/:userId' element={<SuspenseProfile />} />
              </Route>
              <Route path='/chat' element={<SuspenseChatPage />} />
              <Route path='/users' element={<UsersPage pageTitle={"Samurai"} />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Content>
        </Layout.Content>
      </Layout>
    </div>
  )
}
