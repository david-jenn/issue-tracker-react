import { useEffect, useState } from 'react';
import _ from 'lodash';
import BugSummary from './BugSummary';
import { nanoid } from 'nanoid';
import axios from 'axios';
//import './BugList.css'

function BugList({ auth, showError, showSuccess }) {
  // const [bugs, setBugs] = useState([
  //   {
  //     _id: nanoid(),
  //     title: 'Alpha Bug',
  //     author: 'David Jenn',
  //     dateFormatted: '01/22/2021',
  //     status: 'open',
  //     classification: 'unclassified',
  //     userAssigned: 'John Doe'
  //   },
  //   {
  //     _id: nanoid(),
  //     title: 'Beta Bug',
  //     author: 'John Doe',
  //     dateFormatted: '01/22/2021',
  //     status: 'open',
  //     classification: 'approved',
  //     userAssigned: 'John Doe'
  //   },
  //   {
  //     _id: nanoid(),
  //     title: 'Delta Bug',
  //     author: 'David Jenn',
  //     dateFormatted: '01/22/2021',
  //     status: 'closed',
  //     classification: 'duplicate',
  //     userAssigned: 'John Doe'
  //   },
  //   {
  //     _id: nanoid(),
  //     title: 'Echo Bug',
  //     author: 'Steve Price',
  //     dateFormatted: '01/22/2021',
  //     status: 'open',
  //     classification: 'unapproved',
  //     userAssigned: 'John Doe'
  //   },
  //   {
  //     _id: nanoid(),
  //     title: 'Foxtrot Bug',
  //     author: 'John Doe',
  //     dateFormatted: '01/22/2021',
  //     status: 'open',
  //     classification: 'unclassified',
  //     userAssigned: 'John Doe'
  //   },

  // ]);

  const [pending, setPending] = useState(false);
  const [bugs, setBugs] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/bug/list`, {
      method: 'get',
      params: { pageSize: 1000, closed: 'true' },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPending(false);
        if (_.isArray(res.data)) {
          setBugs(res.data);
        } else {
          setError('Expected an array');
        }
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        setError(err.message);
      });
  }, [auth]);

  return (
    <div className="p-3 text-light">
      <h1 className="text-center mb-3">Bug List</h1>
      <div className="mb-3">
        <label htmlFor="bugSearch" className="visually-hidden">
          Search Bugs
        </label>
        <input type="email" className="form-control mb-3" id="bugSearch" />
        <button type="button" className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="filterListContainer d-flex row">
        <div className="filterContainer mb-3 col-md-3">
          <div className="filterItem">
            <label htmlFor="classificationFilter" className="form-label">
              Classification
            </label>
            <select id="classificationFilter" name="classificationFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="unclassified">Unclassified</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
              <option value="duplicate">Duplicate</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="minAge" className="form-label">
              Min Age
            </label>
            <select id="minAgeFilter" name="minAgeFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="oneHour">1-hour</option>
              <option value="fourHours">4-hours</option>
              <option value="twelveHours">12-hours</option>
              <option value="oneDay">1-day</option>
              <option value="oneWeek">1-week</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="maxAgeFilter" className="form-label">
              Max Age
            </label>
            <select id="maxAgeFilter" name="maxAgeFilter" className="form-select border border-dark">
              <option value="all">All</option>
              <option value="oneHour">1-hour</option>
              <option value="fourHours">4-hours</option>
              <option value="twelveHours">12-hours</option>
              <option value="oneDay">1-day</option>
              <option value="oneWeek">1-week</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="statusFilter" className="form-label">
              Status
            </label>
            <select id="statusFilter" name="statusFilter" className="form-select border border-dark">
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="filterItem">
            <label htmlFor="sortBy" className="form-label">
              Sort By
            </label>
            <select id="sortBy" name="sortBy" className="form-select border border-dark">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title</option>
              <option value="userAssigned">User Assigned</option>
              <option value="author">Author</option>
            </select>
          </div>
        </div>
        <div className="bugSummariesSection col col-md-9 p-3">
          {pending && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {!pending && (
            <div>
              {_.map(bugs, (bug) => (
                <BugSummary key={bug._id} bug={bug} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BugList;
