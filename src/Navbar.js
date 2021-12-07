import { NavLink } from 'react-router-dom';
import { FaDoorOpen, FaList } from "react-icons/fa";

import './NavBar.css';

function NavBar({ auth, onLogout }) {

  function onClickLogout(evt) {
    evt.preventDefault();
    onLogout();
  }

  return (
    <header className="mb-3 position-sticky top-0">
      <nav className="bg-secondary navbar navbar-dark   navbar-expand-sm p-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Issue Tracker
          </NavLink>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbar1"
            aria-controls="navbar1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbar1" className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {!auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    <FaDoorOpen className="m-1" />
                    Login
                  </NavLink>
                </li>
              )}
              
              {!auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className="nav-item">
                <NavLink className="nav-link" to="/bug/report">
                  Report Bug
                </NavLink>
              </li>
              )}
              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bug/list">
                    Bug List
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/list">
                    User List
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={(evt) => onClickLogout(evt)}>
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
