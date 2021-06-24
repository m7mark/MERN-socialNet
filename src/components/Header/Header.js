import p from './Header.module.css';
import logo from './01.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={p.header}>
      <img src={logo} alt="header" />
      <div className={p.loginBlock}>{props.isAuth ? props.login
        : <NavLink to={'/login'}>Login</NavLink>}</div>
    </header>

  );
}
export default Header;
