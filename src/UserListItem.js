import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import './UserListItem.css';
import _ from 'lodash';


function UserListItem({ user }) {
  const navigate = useNavigate();

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
    <div className="card border-light mb-2 listItem" onClick={(evt) => navigate(`/user/${user._id}`)}>
      <div className="card-body">
        <div className="titleContainer d-md-flex justify-content-between">
          <div className="card-title">
            <div className="text-primary text-decoration-underline">{user.fullName}</div>
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

export default UserListItem;
