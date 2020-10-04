import React from 'react';
import { useAuth } from '../context/authContext';

const Header = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav aria-label="main navigation" className="navbar" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            alt="logo"
            height="28"
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
          />
        </a>

        <a
          aria-expanded="false"
          aria-label="menu"
          className="navbar-burger burger"
          data-target="navbarBasicExample"
          role="button"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className="navbar-menu" id="navbarBasicExample">
        <div className="navbar-start">
          <a className="navbar-item">
            Лента
          </a>

          <a className="navbar-item">
            Команды
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Прочее
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-light" type="button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
