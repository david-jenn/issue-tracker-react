import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import InputField from './InputField';
import { Link } from 'react-router-dom'


function Register({ showError, onLogin }) {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(false);
  

 

  const emailError = !email ? 'Email is required' : !email.includes('@') ? 'Email must include @ sign' : '';

  const emailConfirmError = !emailConfirm ? 'Must Confirm Email' : email !== emailConfirm ? 'Emails Must Match' : '';

  const passwordError = !password
    ? 'Password is required'
    : password.length < 8
    ? 'Password must be at least 8 characters'
    : '';

  const passwordConfirmError = !passwordConfirm
    ? 'Must Confirm Password'
    : password !== passwordConfirm
    ? 'Password Must Match'
    : '';

  const givenNameError = !givenName ? 'Given name required' : '';
  const familyNameError = !familyName ? 'Family name required' : '';
  const fullNameError = !fullName ? 'Full name required' : '';

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onClickRegister(evt) {
    evt.preventDefault();

    setError('');
    setSuccess('');
    setPending(true);

    if (emailError || passwordError || givenNameError || familyNameError || fullNameError) {
      setError('Please fix errors above');
      showError('Please fix errors above');
      return;
    }
 
    axios(`${process.env.REACT_APP_API_URL}/api/user/register`, {
      method: 'post',
      data: { email, password, givenName, familyName, fullName },
    })
      .then((res) => {
        console.log(res.data.success);
        console.log(res.data);
        const authPayload = jwt.decode(res.data.token);

        const auth = {
          email,
          userId: res.data.userId,
          token: res.data.token,
          payload: authPayload,
        };
        setPending(false);
        setSuccess(res.data.success);
        onLogin(auth);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
            showError(resError);
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
        }
      });
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div className="row">
          <div className="col-md-6">
            <InputField
              label="Email"
              id="Register-email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(evt) => onInputChange(evt, setEmail)}
              error={emailError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Confirm Email"
              id="Register-email-confirm"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={emailConfirm}
              onChange={(evt) => onInputChange(evt, setEmailConfirm)}
              error={emailConfirmError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Password"
              id="Register-password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(evt) => onInputChange(evt, setPassword)}
              error={passwordError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Confirm Password"
              id="Register-password-confirm"
              type="password"
              autoComplete="password"
              value={passwordConfirm}
              onChange={(evt) => onInputChange(evt, setPasswordConfirm)}
              error={passwordConfirmError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Given Name"
              id="Register-given-name"
              type="text"
              autoComplete="given-name"
              value={givenName}
              onChange={(evt) => onInputChange(evt, setGivenName)}
              error={givenNameError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Family Name"
              id="Register-family-name"
              type="text"
              autoComplete="family-name"
              value={familyName}
              onChange={(evt) => onInputChange(evt, setFamilyName)}
              error={familyNameError}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Full Name"
              id="Register-full-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(evt) => onInputChange(evt, setFullName)}
              error={fullNameError}
            />
          </div>
          <div className="mb-3 d-flex flex-direction-column justify-content-between">
            <button type="submit" className="btn btn-primary" onClick={(evt) => onClickRegister(evt)}>
              Register
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
            <div>Already have an account?</div>
            <Link to="/login">Login</Link>
          </div>
          {error && <div className="text-danger">{error}</div>}
          {success && <div className="text-success">{success}</div>}
        </div>
      </form>
    </div>
  );
}

export default Register;
