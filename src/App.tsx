import { Route } from 'react-router'
import * as React from 'react'
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import { Login } from './components/Login/Login'
import Nav from './components/Nav/Nav'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect, withRouter } from 'react-router-dom'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/store'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'
import { withSuspense } from './hoc/withSuspense'
import { Users } from './components/Users/Users'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspenseProfile = withSuspense(ProfileContainer)
const DialogsProfile = withSuspense(DialogsContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {
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
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <div className='app-wrapper-content'>
          <Route path='/'
            render={() => <Redirect to={'/profile'} />} />
          <Route path='/profile/:userId?'
            render={() => <SuspenseProfile />} />
          <Route path='/messages'
            render={() => <DialogsProfile />} />
          <Route path='/users' render={() => <Users pageTitle={"Самураи"} />} />
          <Route path='/login' render={() => <Login />} />
        </div>
      </div>
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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp
