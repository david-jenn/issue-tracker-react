import { Link } from 'react-router-dom';
import moment from 'moment';

import './BugSummary.css';

function BugSummary( {bug} ) {

  
  function getClassificationClasses() {
    const classes =
      bug.classification === 'unclassified'
        ? 'me-2 badge bg-warning'
        : bug.classification === 'approved'
        ? 'me-2 badge bg-primary'
        : bug.classification === 'unapproved' || 'duplicate'
        ? 'me-2 badge bg-danger'
        : 'bg-secondary';

    return classes;
  }

  function getStatusClasses() {
    const classes =
      bug.closed === false || 'false'  ? 'me-2 badge bg-primary' : bug.closed === true || 'true' ? 'me-2 badge bg-danger' : '';
    return classes;
  }

  return (
    <div className="card border-dark mb-2 text-dark">
      <div className="card-body">
        <span className="card-title">
          <Link to={`/pet/${bug._id}`}>{bug.title}</Link>
        </span>
        <div>
          <span className={getClassificationClasses()}>{bug.classification}</span>
          <span className={getStatusClasses()}>{bug.closed ? 'closed' : 'open'}</span>
        </div>
        <div>
          <span>Assigned to {bug.title}</span>
        </div>
      </div>
      <div className="card-footer">
        <span>
          Created by {bug.title} on {bug.title}
        </span>
      </div>
    </div>
  );
}

export default BugSummary;
