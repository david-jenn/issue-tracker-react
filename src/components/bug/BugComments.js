import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import CommentSummary from './CommentSummary';
import CommentForm from './CommentForm';

function BugComments({ auth, bug, showError, showSuccess }) {
  const { bugId } = useParams();
  const [comments, setComments] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState('');

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/comment/list`, {
      method: 'get',
      params: { pageSize: 1 },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          setComments(orderComments(res.data));
          setShowCommentForm(false);
        } else {
          setError('Expected an array');
        }
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
          showError(err.message);
        }
      });
  }, [bug, renderCount]);

  function displayCommentForm(evt) {
    evt.preventDefault();
    if (!showCommentForm) {
      setShowCommentForm(true);
    } else {
      setShowCommentForm(false);
    }
  }

  function reRenderComments() {
    setRenderCount(renderCount + 1);
    console.log(renderCount);
  }

  function orderComments(comments) {
    const commentsSorted = _.orderBy(comments, ['createdDate'], ['desc']);

    return commentsSorted;
  }

  return (
    <div>
      <div className="form-section">
        <div className="mb-3">
         
          {pending && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        {!pending && !showCommentForm && (
          <div className="d-flex justify-content-end">
            <button
              id="postCommentButton"
              type="button"
              className="btn btn-primary"
              onClick={(evt) => displayCommentForm(evt)}
            >
              Post Comment
            </button>
          </div>
        )}
      </div>
      {showCommentForm && (
        <div>
          <CommentForm
            auth={auth}
            displayCommentForm={displayCommentForm}
            showError={showError}
            reRenderComments={reRenderComments}
            showSuccess={showSuccess}
          />
        </div>
      )}

      <div>
        {_.map(comments, (comment) => (
          <CommentSummary key={comment._id} comment={comment} showError={showError} />
        ))}
        {comments && comments.length === 0 && <div className="fst-italic mb-3">No comments to display</div>}
      </div>
    </div>
  );
}

export default BugComments;
