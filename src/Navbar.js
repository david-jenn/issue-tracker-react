import { NavLink } from 'react-router-dom';
import { FaDoorOpen, FaDoorClosed, FaList, FaSearch,  } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { HiOutlineDocumentAdd, HiOutlineClipboardList } from 'react-icons/hi'

import './NavBar.css';

function NavBar({ auth, onLogout }) {
  function onClickLogout(evt) {
    evt.preventDefault();
    onLogout();
  }

  return (
    <header className=" position-sticky top-0">
      <nav className="bg-secondary navbar navbar-dark navbar-expand-lg p-3">
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
                  <BsFillPersonPlusFill className="m-1" />
                    Register
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bug/report">
                  <HiOutlineDocumentAdd className="m-1" />
                    Report Bug
                  </NavLink>
                </li>
              )}
              
              {auth?.payload?.permissions?.viewBug && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bug/list">
                  <HiOutlineClipboardList className="m-1" />
                    Bug List
                  </NavLink>
                </li>
              )}
              {auth?.payload?.permissions?.viewUser && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/list">
                  <HiOutlineClipboardList className="m-1" />
                    User List
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/me" >
                  <CgProfile className="m-1" />
                  
                    Your Profile
                  </NavLink>
                </li>
              )}

              {auth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={(evt) => onClickLogout(evt)}>
                    <FaDoorClosed className="m-1" />
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
            {auth && <div className="ms-auto  "><NavLink className="fw-bold text-white text-decoration-none" to="/user/me">{auth.email}</NavLink></div>}
          </div>
          
            
          
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
