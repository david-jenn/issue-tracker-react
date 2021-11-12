import { useState } from 'react';
import _ from 'lodash';
import UserSummary from './UserSummary';
import { nanoid } from 'nanoid';

function UserList( {onNavigate} )  {
  const [users, setUsers] = useState([
    {
      _id: nanoid(),
      fullName: 'David Jenn',
      email: 'djenn@gmail.com',
      role: 'DEV',
      createdOn: '12/11/2020'
      
    },
    {
      _id: nanoid(),
      fullName: 'John Doe',
      email: 'jdoe@gmail.com',
      role: 'QA',
      createdOn: '12/23/2020'
    },
    {
      _id: nanoid(),
      fullName: 'John Smith',
      email: 'jmith@gmail.com',
      role: 'BA',
      createdOn: '03/22/2021'
    },
    {
      _id: nanoid(),
      fullName: 'Steve Price',
      email: 'sprice@gmail.com',
      role: 'PM',
      createdOn: '04/24/2021'
    },
    
  ]);

  return (
    
    <div className="p-3 border border-dark bg-dark text-light">
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
        <div className="userSummaries col col-md-9 bg-secondary p-3">
          <div>
            {_.map(users, (user) => (
              <UserSummary key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;