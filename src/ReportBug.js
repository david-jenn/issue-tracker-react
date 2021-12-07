import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import TextAreaField from './TextAreaField';
import InputField from './InputField';


function ReportBug({auth, showError, showSuccess}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onReportBugReq(evt) {
    evt.preventDefault();
    setPending(true)
    if(!title || !description || !stepsToReproduce) {
      setPending(false);
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/new`, {
      method: 'put',
      data: {
        stepsToReproduce, description, title
      },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      
    })
    .then((res) => {
      setSuccess(res.data.message);
      showSuccess(res.data.message);
      setPending(false);
    })
    .catch((err) => {
      setPending(false);
      const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
            console.log(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
            showError(resError);
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
        }

    })
  }

  return (
    <div>
      <h1>Report A New Bug</h1>

      <form id="reportBugForm" className="">
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

        <div>
          <button id="submitBugReport" className="btn btn-primary me-3" onClick={(evt) => onReportBugReq(evt)}>
            Submit
          </button>
          <button id="cancelBugReport" className="btn btn-danger">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportBug;
