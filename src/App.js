import { Route } from 'react-router'
import './App.css'
import DialogsConteiner from './components/Dialogs/DialogsConteiner'
import HeaderContainer from './components/Header/HeaderContainer'
import Nav from './components/Nav/Nav'
import ProfileContainer from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'

const App = (props) => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Nav />
      <div className='app-wrapper-content'>
        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
        <Route path='/messages' render={() => <DialogsConteiner />} />
        <Route path='/users' render={() => <UsersContainer />} />
      </div>
    </div>
  );
}

export default App;
