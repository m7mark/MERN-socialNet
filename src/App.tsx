import * as React from 'react';
import store, { AppStateType } from './redux/store';
import { AntPreloader } from './components/UI/AntPreloader';
import { AppMainPage } from './pages/AppMainPage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import { message } from 'antd';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { Route, withRouter } from 'react-router-dom';
import './styles/App.scss';
import 'antd/dist/antd.css';
// import { Footer } from 'antd/lib/layout/layout';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    message.error('Some error ocured! Check your network');
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
      return <div className='site-main-preloader'>
        <AntPreloader />
      </div>
    }
    return (
      <AppMainPage />
    )
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
