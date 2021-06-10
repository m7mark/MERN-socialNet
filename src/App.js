import { Route } from 'react-router'
import './App.css'
import DialogsConteiner from './components/Dialogs/DialogsConteiner'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'
import UsersContainer from './components/Users/UsersContainer'

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Nav />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile />} />
        <Route path='/messages' render={() => <DialogsConteiner />} />
        <Route path='/users' render={() => <UsersContainer />} />
      </div>
    </div>
  );
}

export default App;
