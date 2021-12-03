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

  const [infoEditError, setInfoEditError] = useState('');
  const [infoEditSuccess, setInfoEditSuccess] = useState('');

  const [roleChangeError, setRoleChangeError] = useState('');
  const [roleChangeSuccess, setRoleChangeSuccess] = useState('');

  const [user, setUser] = useState({});
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [fullNameDisplay, setFullNameDisplay] = useState('');
  const [email, setEmail] = useState('');
  const [roleArray, setRoleArray] = useState([]);
  const [role, setRole] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onRoleChange(evt) {
    console.log(role);

    if (_.isArray(role) && role[0] !== null) {
      const copiedArray = [...role];
      if (evt.currentTarget.checked) {
        if (copiedArray.includes(evt.currentTarget.value)) {
          console.log('do nothing');
        } else {
          copiedArray.push(evt.currentTarget.value);

          setRole(copiedArray);
        }
      } else {
        const filteredArray = _.filter(copiedArray, (x) => x !== evt.currentTarget.value);
        setRole(filteredArray);
      }
    } else {
      console.log('in here');
      const newRoleArray = [];

      if (role && !_.isArray(role)) {
        console.log('in here now');
        newRoleArray.push(role);
        setRole([]);
      }

      if (evt.currentTarget.checked) {
        newRoleArray.push(evt.currentTarget.value);
        console.log(newRoleArray);
        setRole(newRoleArray);
        console.log(role);
      }
    }
    console.log(role);
  }

  function checkForRole(value) {
    if (_.isArray(role)) {
      if (role.includes(value)) {
        return true;
      }
    } else if (role) {
      if (role.includes(value)) {
        return true;
      }
    } else {
      return false;
    }
  }

  function onSendInfoReq(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');
    setInfoEditError('');
    setInfoEditSuccess('');
    setRoleChangeSuccess('');
    setRoleChangeError('');

    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'put',
      data: { givenName, familyName, fullName },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        showSuccess(res.data.message);
        setInfoEditSuccess(res.data.message);
        setFullNameDisplay(fullName);
      })
      .catch((err) => {
        setInfoEditError(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setInfoEditError(resError);
            showError(resError);
          } else if (resError.details) {
            setInfoEditError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setInfoEditError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setInfoEditError(err.message);
          showError('error');
        }
      });
  }

  function onSendRoleReq(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');
    setInfoEditError('');
    setInfoEditSuccess('');
    setRoleChangeSuccess('');
    setRoleChangeError('');

    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'put',
      data: { role },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setRoleChangeSuccess(res.data.message);
        showSuccess(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setRoleChangeError(resError);
            showError(resError);
          } else if (resError.details) {
            setRoleChangeError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setRoleChangeError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setRoleChangeError(err.message);
          showError('error');
        }
      });
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
        setFullNameDisplay(res.data.fullName);
        setEmail(res.data.email);
        setRole(res.data.role);
        console.log(res.data);
        console.log('type: ', typeof role);
        console.log('role: ', role);
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
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!pending && (
        <div>
          <h1>{fullNameDisplay}</h1>
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
              <button className="btn btn-primary" onClick={(evt) => onSendInfoReq(evt)}>
                Confirm Info Edit
              </button>
              {infoEditSuccess && <div className="text-success">{infoEditSuccess}</div>}
              {infoEditError && <div className="text-danger">{infoEditError}</div>}
            </div>
          </form>

          <div className="fs-3 mb-3">Role</div>
          <form id="editRoleForm" className="border-bottom border-light mb-5 row">
            <div className="mb-2 col-md-3 col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="DEV"
                  id="devCheck"
                  onChange={(evt) => onRoleChange(evt)}
                  checked={checkForRole('DEV')}
                />
                <label className="form-check-label" htmlFor="devCheck">
                  Developer
                </label>
              </div>
            </div>
            <div className="mb-2 col-md-3 col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="QA"
                  id="qaCheck"
                  onChange={(evt) => onRoleChange(evt)}
                  checked={checkForRole('QA')}
                />
                <label className="form-check-label" htmlFor="qaCheck">
                  Quality Analyst
                </label>
              </div>
            </div>
            <div className="mb-2 col-md-3 col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="BA"
                  id="baCheck"
                  onChange={(evt) => onRoleChange(evt)}
                  checked={checkForRole('BA')}
                />
                <label className="form-check-label" htmlFor="baCheck">
                  Business Analyst
                </label>
              </div>
            </div>
            <div className="mb-2 col-md-3 col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="TM"
                  id="tmCheck"
                  onChange={(evt) => onRoleChange(evt)}
                  checked={checkForRole('TM')}
                />
                <label className="form-check-label" htmlFor="tmCheck">
                  Technical Manager
                </label>
              </div>
            </div>
            <div className="mb-4 col-md-3 col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="PM"
                  id="pmCheck"
                  onChange={(evt) => onRoleChange(evt)}
                  checked={checkForRole('PM')}
                />
                <label className="form-check-label" htmlFor="pmCheck">
                  Product Manager
                </label>
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" onClick={(evt) => onSendRoleReq(evt)}>
                Confirm role change
              </button>
              {roleChangeSuccess && <div className="text-success">{roleChangeSuccess}</div>}
              {roleChangeError && <div className="text-danger">{roleChangeError}</div>}
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <button type="click" className="btn btn-warning">
              Reset Password
            </button>
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
      )}
    </div>
  );
}

export default UserEditor;
