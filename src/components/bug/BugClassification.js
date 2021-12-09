import _ from 'lodash';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


function BugClassification({bug, auth, onInputChange, showSuccess, showError }) {

  const { bugId } = useParams();

  const [classification, setClassification] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const canClassifyBug = auth?.payload?.permissions?.classifyBug;

  useEffect(() => {
    setClassification(bug?.classification);
  }, [bug, auth]);

  function onSendClassifyReq(evt) {
    evt.preventDefault();

    setError('');
    setSuccess('');
    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/classify`, {
      method: 'put',
      data: { classification },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        setPending(false);
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

  return (
    <form id="bug-classify-form" action="/issues" method="put">
      <h3>Classification</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="classificationRadio"
          id="unclassifiedCheck"
          value="unclassified"
          disabled={!canClassifyBug}
          checked={classification === 'unclassified' ? true : false}
          onChange={(evt) => onInputChange(evt, setClassification)}
        ></input>
        <label className="form-label" htmlFor="unclassifiedCheck">
          Unclassified
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="classificationRadio"
          id="duplicateCheck"
          value="duplicate"
          disabled={!canClassifyBug}
          checked={classification === 'duplicate' ? true : false}
          onChange={(evt) => onInputChange(evt, setClassification)}
        ></input>
        <label className="form-label" htmlFor="duplicateCheck">
          Duplicate
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="classificationRadio"
          id="approvedCheck"
          value="approved"
          disabled={!canClassifyBug}
          checked={classification === 'approved' ? true : false}
          onChange={(evt) => onInputChange(evt, setClassification)}
        ></input>
        <label className="form-label" htmlFor="approvedCheck">
          Approved
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="classificationRadio"
          id="unapprovedCheck"
          value="unapproved"
          disabled={!canClassifyBug}
          checked={classification === 'unapproved' ? true : false}
          onChange={(evt) => onInputChange(evt, setClassification)}
        ></input>
        <label className="form-label" htmlFor="unapprovedCheck">
          Unapproved
        </label>
      </div>
      {canClassifyBug && (
        <button
          id="bug-classify-btn"
          type="submit"
          className="btn btn-primary mb-3 me-3"
          disabled={!canClassifyBug}
          onClick={(evt) => onSendClassifyReq(evt)}
        >
          Set Classification
        </button>
      )}
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {success && <div className="text-success">{success}</div>}
      {error && <div className="text-danger">{error}</div>}

      <div className="muteText">Classified on 01/01/2021 by John Doe</div>
    </form>
  );
}

export default BugClassification;
