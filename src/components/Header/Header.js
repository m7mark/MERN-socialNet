import p from './Header.module.css';
import logo from './01.png';

const Header = () => {
  return (
    <header className={p.header}>
      <img src = {logo} />
    </header>

  );
}
export default Header;
