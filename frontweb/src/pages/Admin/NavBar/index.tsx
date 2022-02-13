import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/requests';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="nav-admin-container">
      <ul>
        <li>
          <NavLink to="/admin/products" className="nav-admin-items">
            <p>Produtos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="nav-admin-items">
            <p>Categorias</p>
          </NavLink>
        </li>
        {hasAnyRoles(['ROLE_ADMIN']) && (
          <li>
            <NavLink to="/admin/users" className="nav-admin-items">
              <p>Usuários</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
