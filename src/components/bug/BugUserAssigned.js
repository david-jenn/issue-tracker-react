import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import SelectField from '../../SelectField';

function BugUserAssigned({ bug, auth, showError, showSuccess, onInputChange }) {
  const { bugId } = useParams();

  const [assignedToId, setAssignedToId] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [assignedBy, setAssignedBy] = useState(null)
  const [users, setUsers] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const assignedUsersOptions = _.map(users, (x, index) => (
    <option key={x._id} value={x._id}>
      {x.fullName} {formatRoles(x.role)}
    </option>
  ))

  useEffect(() => {
    setAssignedTo(bug?.assignedTo);
    setAssignedToId(bug?.assignedTo?._id);
    setAssignedBy(bug?.assignedBy?.fullName);

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
        setAssignedBy(auth.payload.fullName);
        setAssignedTo(_.find(users, (x) => x._id === assignedToId));
        setSuccess(res.data.message);
        showSuccess(res.data.message);
        console.log(assignedTo);
        console.log(auth);
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
    <div>
    <form>
      <h3>Assigned User</h3>
      

      <SelectField
        label="Select User"
        id="employeeAssign"
        error=""
        value={assignedToId ? assignedToId : ''}
        onChange={(evt) => onInputChange(evt, setAssignedToId)}
        children={[
          <option key="" value={null}>
          No User Assigned
        </option>,
        ...assignedUsersOptions

        ]}
      />
      

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
    <div>Assigned to {assignedTo?.fullName} </div>

    {( bug.assignedBy ||  assignedBy ) && <div className="muteText">Assigned on 01/01/2021 by {assignedBy}  </div> }
    </div>


  );
}

export default BugUserAssigned;
