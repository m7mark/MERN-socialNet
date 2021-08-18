import p from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectUserLogin } from '../../redux/auth-selector';
import { logout } from '../../redux/auth-reducer';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';


export const AppHeader: React.FC = () => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectUserLogin)
  const dispatch = useDispatch()
  const logoutCallback = () => { dispatch(logout()) }

  return (
    <header>
      <div className={p.loginBlock}>
        {
          isAuth
            ? <div> <Text mark>{login} {' '}</Text> 
              <Button onClick={logoutCallback}>Log Out</Button> </div>
            : <Link to={'/login'} replace><Button>Login</Button></Link>
        }
      </div>
    </header>
  );
}