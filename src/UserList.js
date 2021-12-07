import { useState, useEffect } from 'react';
import _ from 'lodash';
import UserSummary from './UserSummary';
import { nanoid } from 'nanoid';
import axios from 'axios';

function UserList({ auth, showError }) {
  const [pending, setPending] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  const [keywords, setKeywords] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [role, setRole] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [displayFilter, setDisplayFilter] = useState(false);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);

    console.log(newValue);
  }

  function toggleDisplayFilter(evt) {
    evt.preventDefault();
    if (displayFilter) {
      setDisplayFilter(false);
    } else {
      setDisplayFilter(true);
    }
  }

  function onKeywordSearch(evt) {
    evt.preventDefault();
    if (!auth) {
      return;
    }
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: { pageSize: 1000, minAge, maxAge, role, sortBy, keywords },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('Expected an array');
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
  }

  useEffect(() => {
    setPending(true);
    setError('');

    if (!auth) {
      return;
    }
    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000, minAge, maxAge, role, sortBy, keywords },
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
  }, [auth, role, minAge, maxAge, sortBy]);

  return (
    <div className="p-3">
      <h1 className="text-center mb-3">User List</h1>
      <div className="mb-3">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            aria-label="keyword-search"
            aria-describedby="button-search"
            onChange={(evt) => onInputChange(evt, setKeywords)}
          />
          <button class="btn btn-primary" type="button" id="button-addon2" onClick={(evt) => onKeywordSearch(evt)}>
            Search
          </button>
        </div>

        <a href="/" className="text-info" onClick={(evt) => toggleDisplayFilter(evt)}>
          Show/Hide Filters
        </a>
      </div>

      <div className=" filterListContainer d-flex row">
        <div className={displayFilter ? 'filterContainer mb-3 col-md-3' : 'd-none'}>
          <div className="filterItem">
            <label htmlFor="classificationFilter" className="form-label">
              Role
            </label>
            <select
              id="roleFilter"
              name="roleFilter"
              className="form-select border border-dark"
              onChange={(evt) => onInputChange(evt, setRole)}
            >
              <option value="">All</option>
              <option value="DEV">DEV</option>
              <option value="QA">QA</option>
              <option value="BA">BA</option>
              <option value="PM">PM</option>
              <option value="TM">TM</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="minAge" className="form-label">
              Min Age
            </label>
            <select
              id="minAgeFilter"
              name="minAgeFilter"
              className="form-select border border-dark"
              onChange={(evt) => onInputChange(evt, setMinAge)}
            >
              <option value="">All</option>
              <option value="1">1-day</option>
              <option value="7">7-days</option>
              <option value="30">30-days</option>
              <option value="60">60-days</option>
              <option value="90">90-days</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="maxAgeFilter" className="form-label">
              Max Age
            </label>
            <select
              id="maxAgeFilter"
              name="maxAgeFilter"
              className="form-select border border-dark"
              onChange={(evt) => onInputChange(evt, setMaxAge)}
            >
              <option value="">All</option>
              <option value="1">1-day</option>
              <option value="7">7-days</option>
              <option value="30">30-days</option>
              <option value="60">60-days</option>
              <option value="90">90-days</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="sortBy" className="form-label">
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="form-select border border-dark"
              onChange={(evt) => onInputChange(evt, setSortBy)}
            >
              <option value="givenName">Given Name</option>
              <option value="familyName">Family Name</option>
              <option value="role">Role</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className={displayFilter ? 'userSummariesSection col col-md-9 p-3' : 'userSummariesSection col p-3'}>
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
