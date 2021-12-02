import { Link } from 'react-router-dom';
import moment from 'moment';

import './UserSummary.css';
import _ from 'lodash';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';

function UserSummary({ user }) {
  function displayRoleBadges(user) {
    if (_.isArray(user.role) && user.role[0]) {
      return (
        <div>
          {_.map(user.role, (role, index) => (
            <span key={index} className="badge bg-primary me-2">{role}</span>
          ))}
        </div>
      );
    } else if (_.isString(user.role)) {
      return <span className="badge bg-primary me-2">{user.role}</span>;
    } else {
      return <span className="badge bg-danger me-2">No Role</span>;
    }
  }

  return (
    <div className="card border-dark text-dark mb-2">
      <div className="card-body">
        <div className="titleContainer d-md-flex justify-content-between">
          <div className="card-title">
            <Link to={`/user/${user._id}`}>{user.fullName}</Link>
          </div>
          <div>{displayRoleBadges(user)}</div>
        </div>
        <div>{user.email}</div>
      </div>
      <div className="card-footer">
        {user.createdDate && <span>User added {moment(user.createdDate).fromNow()}</span>}
      </div>
    </div>
  );
}

export default UserSummary;
