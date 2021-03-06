import { useState, useEffect } from 'react';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa'

import { HiOutlineClipboardList } from 'react-icons/hi'

import SelectField from './SelectField';
import UserListItem from './UserListItem';

import './UserList.css';

function UserList({ auth, showError }) {
 
  const [pending, setPending] = useState(false);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  const [keywords, setKeywords] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [role, setRole] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [rerenderCount, setRerenderCount] = useState(0);
 

  const [displayFilter, setDisplayFilter] = useState(false);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    setTimeout(() => setRerenderCount(rerenderCount + 1), 500);
  }

  function toggleDisplayFilter(evt) {
    evt.preventDefault();
    if (displayFilter) {
      setDisplayFilter(false);
    } else {
      setDisplayFilter(true);
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
    fetchSearchResults();
  }

  useEffect(() => {
    fetchSearchResults();
  }, [auth, rerenderCount]);

  function fetchSearchResults() {
    console.log('fetch');
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

  return (
    <div className="">
      <h1 className="mb-3"><HiOutlineClipboardList className="me-2"/>User List</h1>
      <form className="mb-1">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="keyword-search"
            aria-describedby="button-search"
            onChange={(evt) => onInputChange(evt, setKeywords)}
          />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={(evt) => onSubmit(evt)}>
            <FaSearch />
          </button>
        </div>
        <div className="loadingRow d-flex align-content-center">
          <a href="/" className="text-info fst-italic me-3" onClick={(evt) => toggleDisplayFilter(evt)}>
            show/hide filters
          </a>
          {pending && (
            <div className="spinner-border text-primary spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>

      <div className=" filterListContainer d-flex row">
        <div className={displayFilter ? 'filterContainer mb-3 d-md-flex' : 'd-none'}>
          <SelectField
            label="Role"
            id="roleFilter"
            error=""
            onChange={(evt) => onInputChange(evt, setRole)}
            children={[
              <option key="all" value="">All</option>,
              <option key="DEV" value="DEV">DEV</option>,
              <option key="QA" value="QA">QA</option>,
              <option key="BA" value="BA">BA</option>,
              <option key="PM" value="PM">PM</option>,
              <option key="TM" value="TM">TM</option>,
            ]}
          />


          <SelectField
            label="Min Age"
            id="minAgeFilter"
            error=""
            onChange={(evt) => onInputChange(evt, setMinAge)}
            children={[
              <option key="all" value="">All</option>,
              <option key="1" value="1">1-day</option>,
              <option key="7" value="7">7-days</option>,
              <option key="30" value="30">30-days</option>,
              <option key="60" value="60">60-days</option>,
              <option key="90" value="90">90-days</option>,
            ]}
          />

          <SelectField
            label="Max Age"
            id="maxAgeFilter"
            error=""
            onChange={(evt) => onInputChange(evt, setMaxAge)}
            children={[
              <option key="all" value="">All</option>,
              <option key="1" value="1">1-day</option>,
              <option key="7" value="7">7-days</option>,
              <option key="30" value="30">30-days</option>,
              <option key="60" value="60">60-days</option>,
              <option key="90" value="90">90-days</option>,
            ]}
          />

          <SelectField
            label="Sort By"
            id="sortBy"
            error=""
            onChange={(evt) => onInputChange(evt, setSortBy)}
            children={[
              <option key="givenName" value="givenName">Given Name</option>,
              <option key="familyName" value="familyName">Family Name</option>,
              <option key="role" value="role">Role</option>,
              <option key="newest" value="newest">Newest</option>,
              <option key="oldest" value="oldest">Oldest</option>,
            ]}
          />

        </div>
        <div className={displayFilter ? 'userSummariesSection col p-3' : 'userSummariesSection col p-3'}>
          {users?.length > 0 && (
            <div>
              {_.map(users, (user) => (
                <UserListItem key={user._id} user={user} />
              ))}
            </div>
          )}

          {!pending && error && <div className="fs-3 text-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default UserList;
