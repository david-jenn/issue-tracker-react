import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import _ from 'lodash';

import InputField from './InputField';

import './UserEditor.css';

function UserEditor({ auth, showError, showSuccess }) {
  const { userId } = useParams();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [user, setUser] = useState({});
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  useEffect(() => {
    if (!auth) {
      return;
    }

    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);

        setUser(res.data);
        setGivenName(res.data.givenName);
        setFamilyName(res.data.familyName);
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(err.message);
        }
      });
  }, [auth]);

  return (
    <div className="text-light">
      <h1>{user.fullName}</h1>
      {user.createdDate && <span>User created {moment(user.createdDate).fromNow()}</span>}

      <form id="editUserDetailsForm" className="border-bottom border-light row mb-3">
        <div className="col-md-6">
          <InputField
            label="Given Name"
            id="userEditorGivenName"
            type="text"
            value={givenName}
            onChange={(evt) => onInputChange(evt, setGivenName)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Family Name"
            id="userEditorFamilyName"
            type="text"
            value={familyName}
            onChange={(evt) => onInputChange(evt, setFamilyName)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Full Name"
            id="userEditorFullName"
            type="text"
            value={fullName}
            onChange={(evt) => onInputChange(evt, setFullName)}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary">Confirm Info Edit</button>
        </div>
      </form>

      <div className="fs-3 mb-3">Role</div>
      <form id="editRoleForm" className="border-bottom border-light mb-5 row">
        <div className="mb-2 col-md-3 col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="devCheck" />
            <label className="form-check-label" htmlFor="devCheck">
              Developer
            </label>
          </div>
        </div>
        <div className="mb-2 col-md-3 col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="devCheck" />
            <label className="form-check-label" htmlFor="devCheck">
              Quality Analyst
            </label>
          </div>
        </div>
        <div className="mb-2 col-md-3 col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="devCheck" />
            <label className="form-check-label" htmlFor="devCheck">
              Business Analyst
            </label>
          </div>
        </div>
        <div className="mb-2 col-md-3 col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="devCheck" />
            <label className="form-check-label" htmlFor="devCheck">
              Technical Manager
            </label>
          </div>
        </div>
        <div className="mb-4 col-md-3 col-sm-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="devCheck" />
            <label className="form-check-label" htmlFor="devCheck">
              Product Manager
            </label>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Confirm role change</button>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        <button type="click" className="btn btn-warning">Reset Password</button>
      </div>
      <form id="restPasswordForm">
        <div>Password Reset</div>
      <div className="col-md-6">
          <InputField
            label="Enter Old Password"
            id="userOldPassword"
            type="text"
            value={oldPassword}
            onChange={(evt) => onInputChange(evt, setOldPassword)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Enter New Password"
            id="userNewPassword"
            type="text"
            value={newPassword}
            onChange={(evt) => onInputChange(evt, setNewPassword)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            label="Confirm New Password"
            id="userConfirmNewPassword"
            type="text"
            value={confirmNewPassword}
            onChange={(evt) => onInputChange(evt, setConfirmNewPassword)}
          />
        </div>
        <div>
          <button className="btn btn-primary me-3">Confirm Password Change</button>
          <button className="btn btn-danger">Cancel</button>
        </div>
      </form>


    </div>
  );
}

export default UserEditor;
