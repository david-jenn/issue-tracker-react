import { useState } from 'react';
import BugList from './BugList';
import UserList from './UserList';
import Login from './Login';
import Register from './Register';
import BugEditor from './BugEditor';


function App() {
  const [screen, setScreen] = useState('/login');
  const [bug, setBug] = useState({});

  function onNavigate(evt, href) {
    evt.preventDefault();
    setScreen(href);
  }

  function getBug(evt, bug) {
    setBug(bug);
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <nav className="bg-light navbar navbar-light navbar-expand-sm p-3">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <div>Issue Tracker</div>
          </a>

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
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/login" onClick={(evt) => onNavigate(evt, '/login')}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/register"
                  onClick={(evt) => onNavigate(evt, '/register')}
                >
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/bug/list"
                  onClick={(evt) => onNavigate(evt, '/bug/list')}
                >
                  Bug List
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/user/list"
                  onClick={(evt) => onNavigate(evt, '/user/list')}
                >
                  User List
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1 container">
        {screen === '/login' && <Login onNavigate={onNavigate} />} 
        {screen === '/register' && <Register onNavigate={onNavigate} />} 
        {screen === '/bug/list' && <BugList onNavigate={onNavigate} getBug={getBug} />}
        {screen === '/user/list' && <UserList onNavigate={onNavigate} />}
        {screen === `/bug/edit/${bug._id}` && <BugEditor bug={bug} onNavigate={onNavigate} />}
      </main>
      <footer className="bg-light">
        <div>Issue Tracker 2021</div>
      </footer>
    </div>
  );
}

export default App;