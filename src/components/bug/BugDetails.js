import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';


import TextAreaField from '../../TextAreaField';
import InputField from '../../InputField';


function BugDetails({ bug, onInputChange, auth, showSuccess, showError }) {
  const { bugId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setTitle(bug?.title);
    setDescription(bug?.description);
    setStepsToReproduce(bug?.stepsToReproduce);
  }, [bug, auth])

  function onSendEditReq(evt) {
    evt.preventDefault();
    setError('');
    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'put',
      data: { title, description, stepsToReproduce },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        console.log(res);
        showSuccess(res.data.message);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x, index) => <div key={index}>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError('error');
        }
      });
  }

  return (
    <form id="bug-edit-form" className="border-bottom border-light mb-3" action="/issues" method="put">
      <InputField
        label="Title"
        id="bugEditor-title"
        type="text"
        value={title}
        onChange={(evt) => onInputChange(evt, setTitle)}
      />
      <TextAreaField
        label="Description"
        id="bugEditor-description"
        name="bugEditor-description"
        rows="5"
        value={description}
        onChange={(evt) => onInputChange(evt, setDescription)}
      />

      <TextAreaField
        label="Steps To Reproduce"
        id="BugEditor-stepsToReproduce"
        name="BugEditor-stepsToReproduce"
        rows="5"
        value={stepsToReproduce}
        onChange={(evt) => onInputChange(evt, setStepsToReproduce)}
      />
      <div className="form-section">
        <button
          id="bug-edit-btn"
          type="submit"
          className="btn btn-primary mb-3 me-3"
          onClick={(evt) => onSendEditReq(evt)}
        >
          Confirm Changes
        </button>

        {pending && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {success && <div className="text-success">{success}</div>}
        {error && <div className="text-danger">{error}</div>}
      </div>
    </form>
  );
}

export default BugDetails;
