import p from './Header.module.css';
import logo from './01.png';

const Header = () => {
  return (
    <header className={p.header}>
      <img src = {logo} alt="header" />
    </header>

  );
}
export default Header;
