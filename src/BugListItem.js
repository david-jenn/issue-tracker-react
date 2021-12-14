import { Link } from 'react-router-dom';
import moment from 'moment';

import './BugListItem.css'

function BugListItem({ bug }) {
  function getClassificationClasses() {
    const classes =
      bug.classification === 'unclassified'
        ? 'me-2 badge bg-warning'
        : bug.classification === 'approved'
        ? 'me-2 badge bg-success'
        : bug.classification === 'unapproved'
        ? 'me-2 badge bg-danger'
        : bug.classification === 'duplicate'
        ? 'me-2 badge bg-danger'
        : 'me-2 badge bg-secondary';

    return classes;
  }

  function getStatusClasses() {
    const classes =
      bug.closed === false
        ? 'me-2 badge bg-primary'
        : bug.closed === 'false'
        ? 'me-2 badge bg-primary'
        : bug.closed === true
        ? 'me-2 badge bg-danger'
        : bug.closed === 'true'
        ? 'me-2 badge bg-danger'
        : '';

    return classes;
  }

  return (
    <div className="card border-light mb-2">
      <div className="card-body">
        <div className="title-badge-container d-md-flex justify-content-between">
          <div className="card-title">
            <Link to={`/bug/${bug._id}`}>{bug.title}</Link>
          </div>
          <div>
            <span className={getClassificationClasses()}>{bug.classification}</span>
            <span className={getStatusClasses()}>{bug.closed ? 'closed' : 'open'}</span>
          </div>
        </div>
        <div>
          <span>
            {bug.assignedTo?.fullName ? `Assigned to ${bug.assignedTo?.fullName}` : 'Assigned User Not Found'}
          </span>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-end">
          <div className="me-1">
            {bug.createdBy?.fullName ? `Reported by ${bug.createdBy?.fullName}` : 'Bug author not found. '}

            {bug.createdBy?.fullName && <span> {moment(bug.createdDate).fromNow()}</span>}

            {!bug.createdBy?.fullName && <span>Reported {moment(bug.createdDate).fromNow()} </span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BugListItem;
