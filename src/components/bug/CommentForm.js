import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import TextAreaField from '../../TextAreaField';
function CommentForm({ displayCommentForm, auth, showError, reRenderComments, showSuccess }) {
  const { bugId } = useParams();
  const [text, setText] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function onPostComment(evt) {
    evt.preventDefault();
    setPending(true);
    if (!text) {
      setPending(false);
      setError('Comment cannot be blank');
      showError('Comment cannot be blank');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/comment/new`, {
      method: 'put',
      data: {
        text,
      },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setSuccess(res.data.message);
        showSuccess(res.data.message);
        setPending(false);
        setText('');
        reRenderComments();
        displayCommentForm(evt);
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
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <form className="mb-3">
      <TextAreaField
        label="Post A Comment"
        id="BugEditor-stepsToReproduce"
        name="BugEditor-stepsToReproduce"
        rows="3"
        value={text}
        onChange={(evt) => onInputChange(evt, setText)}
      />
      <div className="d-flex">
        <div>
          <button type="button" className="btn btn-primary me-3" onClick={(evt) => onPostComment(evt)}>
          
            Post
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-danger me-3" onClick={(evt) => displayCommentForm(evt)}>
          
            Cancel
          </button>
          {pending && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
