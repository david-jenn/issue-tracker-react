import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import BugList from './BugList';
import UserList from './UserList';
import Login from './Login';
import Register from './Register';
import BugEditor from './BugEditor';
import UserEditor from './UserEditor';
import NotFound from './NotFound';
import Footer from './Footer';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage) {
      const storedAuthToken = localStorage.getItem('authToken');
      if (storedAuthToken) {
        const authPayload = jwt.decode(storedAuthToken);
        if (authPayload) {
          const auth = {
            token: storedAuthToken,
            payload: authPayload,
            email: authPayload.email,
            userId: authPayload._id,
          };
          setAuth(auth);
        }
      }
    }
  }, []);

  function onLogin(auth) {
    setAuth(auth);
    navigate('/bug/list');
    showSuccess('Logged in!');
    if (localStorage) {
      localStorage.setItem('authToken', auth.token);
    }
  }

  function onLogout(auth) {
    setAuth(null);
    navigate('/login');
    showSuccess('Logged out!');
    if (localStorage) {
      localStorage.removeItem('authToken');
    }
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }

  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  return (
    <div className="App d-flex flex-column min-vh-100 bg-dark text-light">
      <ToastContainer />
      <Navbar auth={auth} onLogout={onLogout} />
      <main className="container my-5 flex-grow-1 ">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={onLogin} showError={showError} />} />
          <Route path="/register" element={<Register showError={showError} onLogin={onLogin} />} />
          <Route path="/bug/list" element={<BugList showError={showError} auth={auth} />} />
          <Route
            path="/bug/:bugId"
            element={<BugEditor auth={auth} showError={showError} showSuccess={showSuccess} />}
          />
          <Route path="/user/list" element={<UserList  showError={showError} auth={auth} />} />
          <Route path="/user/:userId" element={<UserEditor auth={auth} showError={showError} showSuccess={showSuccess} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
