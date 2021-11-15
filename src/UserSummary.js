

import './UserSummary.css'

function UserSummary({ user, onNavigate, getUser }) {

  function showEditUserPage(evt, user) {
    getUser(evt, user);
    onNavigate(evt, `/user/edit/${user._id}`);
  }

  return (
    <div
      id={`user-${user._id}`}
      className="UserSummary d-flex mb-1 flex-grow-1 flex-shrink-1 flex-column flex-sm-row border border-dark p-1"
      onClick={(evt) => showEditUserPage(evt, user)}
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