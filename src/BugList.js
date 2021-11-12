import { useState } from 'react';
import _ from 'lodash';
import BugSummary from './BugSummary';
import { nanoid } from 'nanoid';

function BugList( {onNavigate, getBug } )  {
  const [bugs, setBugs] = useState([
    {
      _id: nanoid(),
      title: 'Alpha Bug',
      author: 'David Jenn',
      dateFormatted: '01/22/2021',
      status: 'open',
    },
    {
      _id: nanoid(),
      title: 'Beta Bug',
      author: 'John Doe',
      dateFormatted: '01/22/2021',
      status: 'open',
    },
    {
      _id: nanoid(),
      title: 'Delta',
      author: 'David Jenn',
      dateFormatted: '01/22/2021',
      status: 'open',
    },
    {
      _id: nanoid(),
      title: 'Echo Bug',
      author: 'Steve Price',
      dateFormatted: '01/22/2021',
      status: 'open',
    },
    {
      _id: nanoid(),
      title: 'Foxtrot Bug',
      author: 'John Doe',
      dateFormatted: '01/22/2021',
      status: 'open',
    },
  ]);

 

  return (
    
    <div className="p-3 border border-dark bg-dark text-light">
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
      <div className="">Show/Hide Filters</div>
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
        <div className="bugSummaries col col-md-9 bg-secondary p-3">
          <div>
            {_.map(bugs, (bug) => (
              <BugSummary 
              key={bug._id}
               bug={bug}
               onNavigate={onNavigate} 
               getBug={getBug}
               />
               
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BugList;
