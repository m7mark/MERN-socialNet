import { Route } from 'react-router'
import * as React from 'react'
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import UsersContainer from './components/Users/UsersContainer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { withSuspense } from './hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
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
          <Route path='/profile/:userId?'
            render={withSuspense(ProfileContainer)} />
          <Route path='/messages'
            render={withSuspense(DialogsContainer)} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))
  (App)

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp
