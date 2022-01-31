import './styles.css';

const Navbar = () => {
  return (
    <nav className="nav-admin-container">
      <ul>
        <li className="nav-admin-items active">
          <a href="link">
            <p>Produtos</p>
          </a>
        </li>
        <li className="nav-admin-items">
          <a href="link">
            <p>Categorias</p>
          </a>
        </li>
        <li className="nav-admin-items">
          <a href="link">
            <p>Usuários</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
