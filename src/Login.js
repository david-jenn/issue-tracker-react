import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import InputField from './InputField';

function Login({ onLogin, showError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(false);
  
  const shouldValidate = false;

  const emailError = !email ? 'Email is required' : !email.includes('@') ? 'Email must include @ sign' : '';

  const passwordError = !password
    ? 'Password is required'
    : password.length < 8
    ? 'Password must be at least 8 characters'
    : '';

  function onClickSubmit(evt) {
    evt.preventDefault();

    setError('');
    setSuccess('');
    setPending(true);

    if (emailError || passwordError) {
      setError('Please fix errors above');
      showError('Please fix errors above');
      setPending(false);
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, { method: 'post', data: { email, password } })
      .then((res) => {
        console.log(res);
        setPending(false);
        console.log(res.data)
        setSuccess(res.data.message);
        const authPayload = jwt.decode(res.data.token);
        const auth = {
          email,
          userId: res.data.userId,
          token: res.data.token,
          payload: authPayload,
        };
        console.log(auth);
        onLogin(auth);
      })
      .catch((err) => {
        console.error(err);
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError)
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
            showError(resError)
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
        }
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <div>
      
      <h1>Login</h1>
      <form>
        <InputField
          label="Email"
          id="LoginForm-email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(evt) => onInputChange(evt, setEmail)}
          error={emailError}
          shouldValidate={shouldValidate || email}
        />
        <InputField
          label="Password"
          id="LoginForm-password"
          type="password"
          autoComplete="current-password"
          placeholder=""
          value={password}
          onChange={(evt) => onInputChange(evt, setPassword)}
          error={passwordError}
          shouldValidate={shouldValidate || password}
        />

        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex flex-direction-column">
            <button className="btn btn-primary me-3" type="submit" onClick={(evt) => onClickSubmit(evt)}>
              Log In
            </button>
            {pending && (
              <div>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <div>Don't have an account yet?</div>
            <Link to="/register">Register</Link>
          </div>
          <div></div>
        </div>

        {error && <div className="mb-3 text-danger">{error}</div>}
        {success && <div className="mb-3 text-success">{success}</div>}
      </form>
    </div>
  );
}

export default Login;
