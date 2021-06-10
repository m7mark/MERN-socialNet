import { NavLink } from 'react-router-dom';
import p from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={p.nav}>
      <div className={p.item}><NavLink to="/profile" activeClassName={p.active}>Profile</NavLink></div>
      <div className={p.item}><NavLink to="/messages"activeClassName={p.active}>Messages</NavLink></div>
      <div className={p.item}><NavLink to="/users"activeClassName={p.active}>Friends</NavLink></div>
      <div className={p.item}>Music</div>
      <div className={p.item}>Settings</div>
    </nav>
  );
}

export default Nav;
