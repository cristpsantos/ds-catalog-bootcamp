import './styles.css';
import 'bootstrap/js/src/collapse.js';

import { Link, NavLink } from 'react-router-dom';
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
  TokenData,
} from 'util/requests';
import { useEffect, useState } from 'react';
import history from 'util/history';

type AuthUser = {
  authenticated: boolean;
  tokenData?: TokenData;
};

const Navbar = () => {
  const [authUser, setAuthUser] = useState<AuthUser>({ authenticated: false });

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement> ) => {
    event.preventDefault();
    removeAuthData();
    setAuthUser({authenticated: false});
    history.replace("/");
  }

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthUser({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthUser({
        authenticated: false,
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        {' '}
        {/* previne quebra de linha entre logo e itens */}
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-login-logout">
          {authUser.authenticated ? (
            <>
              <span className="nav-username">{authUser.tokenData?.user_name}</span>
              <Link to="#logout" onClick={handleLogoutClick}>LOGOUT</Link>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
