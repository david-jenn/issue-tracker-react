

import './UserSummary.css'
function UserSummary({ user }) {
  return (
    <div
      id={`user-${user._id}`}
      className="userListItem d-flex mb-1 flex-grow-1 flex-shrink-1 flex-column flex-sm-row border border-dark ps-1 pe-1 bg-light text-dark"
    >
      <div className="me-3 flex-grow-1 flex-shrink-1">{user.fullName}</div>
      <div className="me-3 flex-shrink-0">{user.role}</div>
      <div className="me-3 flex-shrink-1">
        {user.createdOn}
      </div>
      <div className="me-3 flex-shrink-1">{user.email}</div>
    </div>
  );
}

export default UserSummary;