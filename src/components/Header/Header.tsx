import p from './Header.module.css';
import logo from './01.png';
import { NavLink } from 'react-router-dom';

export type StatePropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: () => void
}
const Header: React.FC<StatePropsType & DispatchPropsType> = (props) => {
  return (
    <header className={p.header}>
      <img src={logo} alt="header" />
      <div className={p.loginBlock}>
        {
          props.isAuth
            ? <div> {props.login} {' '}
              <button onClick={props.logout}>Log Out</button> </div>
            : <NavLink to={'/login'}>Login</NavLink>
        }
      </div>
    </header>
  );
}
export default Header;
