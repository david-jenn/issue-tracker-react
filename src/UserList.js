import { useState, useEffect } from 'react';
import _ from 'lodash';
import UserSummary from './UserSummary';
import { nanoid } from 'nanoid';
import axios from 'axios';

function UserList({ auth, showError }) {
  const [pending, setPending] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);

    console.log(newValue);
  }

  useEffect(() => {
    setPending(true);
    setError('');

    if (!auth) {
      return;
    }
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('expected an array');
        }
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
    <div className="p-3 text-light">
      <h1 className="text-center mb-3">User List</h1>
      <div className="mb-3">
        <label htmlFor="userSearch" className="visually-hidden">
          User Search
        </label>
        <input type="email" className="form-control mb-3" id="userSearch" />
        <button type="button" className="btn btn-primary">
          Search
        </button>
      </div>
      <div className="">Show/Hide Filters</div>
      <div className="filterListContainer d-flex row">
        <div className="filterContainer mb-3 col-md-3">
          <div className="filterItem">
            <label htmlFor="classificationFilter" className="form-label">
              Role
            </label>
            <select id="roleFilter" name="roleFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="developer">DEV</option>
              <option value="qualityAnalyst">QA</option>
              <option value="businessAnalyst">BA</option>
              <option value="productManager">PM</option>
              <option value="technicalManager">TM</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="minAge" className="form-label">
              Min Age
            </label>
            <select id="minAgeFilter" name="minAgeFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="oneHour">1-day</option>
              <option value="fourHours">1-week</option>
              <option value="twelveHours">1-month</option>
              <option value="oneDay">6-months</option>
              <option value="oneWeek">1-year</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="maxAgeFilter" className="form-label">
              Max Age
            </label>
            <select id="maxAgeFilter" name="maxAgeFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="oneHour">1-day</option>
              <option value="fourHours">1-week</option>
              <option value="twelveHours">1-month</option>
              <option value="oneDay">6-months</option>
              <option value="oneWeek">1-year</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="sortBy" className="form-label">
              Sort By
            </label>
            <select id="sortBy" name="sortBy" className="form-select border border-dark">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="givenName">Given Name</option>
              <option value="familyName">Family Name</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>
        <div className="userSummariesSection col col-md-9 p-3">
          {pending && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {users?.length > 0 && (
            <div>
              {_.map(users, (user) => (
                <UserSummary key={user._id} user={user} />
              ))}
            </div>
          )}
          {users?.length === 0 && !error && !pending && <div className="fs-3 text-danger">No Users Found</div>}
          {!pending && error && <div className="fs-3 text-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserList;
