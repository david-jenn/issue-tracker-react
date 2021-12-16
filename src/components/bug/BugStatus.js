import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment'


function BugStatus({ bug, auth, onInputChange, showError, showSuccess }) {
  const { bugId } = useParams();

  const [closed, setClosed] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [closedBy, setClosedBy] = useState(null);
  const [closedOn, setClosedOn] = useState(null);
  const canCloseBug = auth?.payload?.permissions?.closeBug;

  useEffect(() => {
    setClosed(bug?.closed);
    setClosedBy(bug?.closedBy);
    setClosedOn(bug?.closedOn);
  }, [bug, auth]);

  function onSendCloseReq(evt) {
    evt.preventDefault();

    setError('');
    setSuccess('');

    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/close`, {
      method: 'put',
      data: { closed },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setPending(false);
        setClosedBy(auth.payload);
        setClosedOn(new Date());
        setSuccess(res.data.message);
        showSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
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
        }
      });
  }

  

  return (
   
    <form id="bug-status-form" action="/issues" method="put">
      <h3>Status</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="statusRadio"
          id="openCheck"
          value="false"
          disabled={!canCloseBug}
          onChange={(evt) => onInputChange(evt, setClosed)}
          checked={closed === false ? true : closed === 'false' ? true : false}
        ></input>
        <label className="form-label" htmlFor="openCheck">
          Open
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="statusRadio"
          id="closedCheck"
          disabled={!canCloseBug}
          checked={closed === true ? true : closed === 'true' ? true : false}
          value="true"
          onChange={(evt) => onInputChange(evt, setClosed)}
        ></input>
        <label className="form-label" htmlFor="closedCheck">
          Closed
        </label>
      </div>
      {canCloseBug && (
        <button
          id="closeBugBtn"
          type="submit"
          className="btn btn-primary mb-3 me-3"
          disabled={!canCloseBug}
          onClick={(evt) => onSendCloseReq(evt)}
        >
          Set Status
        </button>
      )}
      {success && <div className="text-success">{success}</div>}
      {error && <div className="text-danger">{error}</div>}

      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

     {(bug.closed || closed) && <div className="muteText">Closed {moment(closedOn).fromNow()}</div>}
    </form>
    
  );
}

export default BugStatus;
