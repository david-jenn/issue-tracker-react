import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

function BugUserAssigned({bug, auth, showError, showSuccess, onInputChange}) {
  const { bugId } = useParams();

  const [assignedToId, setAssignedToId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {

    setAssignedTo(bug?.assignedTo);
    setAssignedToId(bug?.assignedTo?._id)

    axios(`${process.env.REACT_APP_API_URL}/api/user/list`, {
      method: 'get',
      params: { pageSize: 1000 },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        if (_.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('Expected an array');
        }
      })
      .catch((err) => {
        console.log(err);

        setError(err.message);
      });
  }, [bug, auth]);

  function onSendAssignmentReq(evt) {
    evt.preventDefault();

    
    setSuccess('');
    setError('');

    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/assign`, {
      method: 'put',
      data: { userAssigned: assignedToId },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        setPending(false);
        setAssignedTo(_.find(users, (x) => x._id === assignedToId));
        setSuccess(res.data.message);
        showSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        const resError = err?.response?.data?.error;

        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
            console.log(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(resError);
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(err.message);
        }
      });
  }

  function formatRoles(role) {
    if (!role) {
      return '()';
    } else if (_.isArray(role)) {
      return '( ' + _.join(role, ', ') + ' )';
    } else {
      return '( ' + role + ' )';
    }
  }

  return (
    <form>
      <h3>Assigned User</h3>
      <label htmlFor="employeeAssign" className="form-label">
        Select User
      </label>

      <select
        id="employeeAssign"
        name="employeeAssign"
        className="form-select border border-dark mb-3"
        onChange={(evt) => onInputChange(evt, setAssignedToId)}
        value={assignedToId ? assignedToId : ''}
      >
        <option key="" value={null}>
          No User Assigned
        </option>
        {_.map(users, (x, index) => (
          <option key={x._id} value={x._id}>
            {x.fullName} {formatRoles(x.role)}
          </option>
        ))}
      </select>
      
        <button
          id="assignmentBugBtn"
          type="submit"
          className="btn btn-primary mb-3 me-3"
          
          onClick={(evt) => onSendAssignmentReq(evt)}
        >
          Reassign Bug
        </button>
      
      {success && <div className="text-success">{success}</div>}
      {error && <div className="text-danger">{error}</div>}

      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </form>
  );
}

export default BugUserAssigned;
