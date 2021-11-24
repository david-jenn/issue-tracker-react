import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import Footer from './Footer'

function App() {
  
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  function onLogin(auth) {
    setAuth(auth);
    navigate('/bug/list');
    showSuccess('Logged in!')
  }

  function onLogout(auth) {
    setAuth(null);
    navigate('/login');
    showSuccess('Logged out!');
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' })
   
  }
  
  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' })
  }

  return (
    <div className="App d-flex flex-column min-vh-100 bg-dark text-light">
      <ToastContainer />
      <Navbar sticky="top" auth={auth} onLogout={onLogout}/>
      <main className="container my-5 flex-grow-1 ">
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={ <Login onLogin={onLogin} showError={showError}/> } />
          <Route path="/register" element={<Register showError={showError} onLogin={onLogin} />} />
          <Route path="/bug/list" element={<BugList auth={auth} />} />
          <Route path="/bug/:bugId" element={<BugEditor auth={auth} showError={showError} showSuccess={showSuccess} />} />
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/:userId" element={<UserEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
