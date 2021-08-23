import * as React from 'react';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/store';
import { AppHeader } from './components/UI/Header/AppHeader';
import {
  Col,
  Layout,
  Menu,
  Row
  } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import {
  Link,
  Redirect,
  Route,
  withRouter
  } from 'react-router-dom';
import { Login } from './pages/LoginPage';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { Users } from './components/Users/Users';
import { withSuspense } from './hoc/withSuspense';
import './styles/App.scss';
import 'antd/dist/antd.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
// import { Footer } from 'antd/lib/layout/layout';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));
const SuspenseProfile = withSuspense(ProfileContainer)
const DialogsProfile = withSuspense(DialogsContainer)
const SuspenseChatPage = withSuspense(ChatPage)

const { Header, Sider, Content } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert("Some error")
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors)
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors)
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout id="components-layout-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          collapsedWidth='0'
        >
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
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                })}
              </Header>
            </Col>
            <Col flex="auto"><AppHeader /></Col>
          </Row>
          <Content
            className={"site-layout-background site-main-content"}
          >
            <Route path='/'
              render={() => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?'
              render={() => <SuspenseProfile />} />
            <Route path='/messages'
              render={() => <DialogsProfile />} />
            <Route path='/chat'
              render={() => <SuspenseChatPage />} />
            <Route path='/users' render={() => <Users pageTitle={"Самураи"} />} />
            <Route path='/login' render={() => <Login />} />
          </Content>
          {/* <Footer></Footer> */}
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))
  (App)

const MainApp = () => {
  return <HashRouter>
    <QueryParamProvider ReactRouterRoute={Route} >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </QueryParamProvider>
  </HashRouter>

}

export default MainApp
