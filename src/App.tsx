import store, { AppStateType } from './redux/store';
import { AppMainPage } from './pages/AppMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import { message } from 'antd';
import { Provider } from 'react-redux';
import './styles/App.css';
import 'antd/dist/antd.css';
import { MainPreloader } from './components/UI/MainPreloader/MainPreloader';
import { useEffect } from 'react';
// import { Footer } from 'antd/lib/layout/layout';

//PRELOADER AND ERROR HANDLE
const App = () => {
  const dispatch = useDispatch()
  let initialized = useSelector((state: AppStateType) => state.app.initialized)
  const catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    message.error('Some error ocured! Check your network');
  }

  useEffect(() => {
    window.addEventListener("unhandledrejection", catchAllUnhandleErrors)
    dispatch(initializeApp());
    return function cleanUp() {
      window.removeEventListener("unhandledrejection", catchAllUnhandleErrors)
    }
  }, [dispatch]);

  return (
    <>
      {initialized
        ? <AppMainPage />
        : <div className='site-main-preloader'>
          <MainPreloader />
        </div>
      }
    </>
  )
}

//EXPORT TO INDEX.JS
const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp
