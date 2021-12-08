import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { moment } from 'moment';

import './BugEditor.css';
import BugDetails from './components/bug/BugDetails';
import BugClassification from './components/bug/BugClassification';
import BugStatus from './components/bug/BugStatus';
import BugUserAssigned from './components/bug/BugUserAssigned';
import BugTestCases from './components/bug/BugTestCases';

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [titleHolder, setTitleHolder] = useState('');
  const [error, setError] = useState('');
  const [pageLoadPending, setPageLoadPending] = useState(false);

  useEffect(() => {
    if (!auth) {
      return;
    }

    setPageLoadPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPageLoadPending(false);
        setBug(res.data);

        setTitleHolder(res.data.title);
      })
      .catch((err) => {
        setPageLoadPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, bugId, showError]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  return (
    <div className="section-container">
      {!auth && <h1 className="text-danger">You do not have permission</h1>}
      {pageLoadPending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {auth && !pageLoadPending && (
        <div>
          <h1 className="">{titleHolder}</h1>

          <div className="muteText mb-4">
            {bug?.createdBy?.fullName ? `Reported by ${bug?.createdBy?.fullName}` : 'Author not found'}
          </div>

          <div className="pageRow row">
            <div className="bugInfoSection col-md-6">
              <div className="detailsSection border-bottom border-light mb-3">
                {bug && (
                  <BugDetails
                    auth={auth}
                    bug={bug}
                    showError={showError}
                    showSuccess={showSuccess}
                    onInputChange={onInputChange}
                  />
                )}
              </div>
              <div className="classificationStatusAssignContainer mb-3">
                <div className="classificationSection border-bottom border-light mb-3">
                  {bug && (
                    <BugClassification
                      auth={auth}
                      bug={bug}
                      showError={showError}
                      showSuccess={showSuccess}
                      onInputChange={onInputChange}
                    />
                  )}
                </div>
                <div className="statusSection border-bottom border-light mb-3">
                  {bug && (
                    <BugStatus
                      auth={auth}
                      bug={bug}
                      showError={showError}
                      showSuccess={showSuccess}
                      onInputChange={onInputChange}
                    />
                  )}
                </div>
                <div className="userAssignedSection border-bottom border-light mb-3">
                  {bug && (
                    <BugUserAssigned
                      auth={auth}
                      bug={bug}
                      showError={showError}
                      showSuccess={showSuccess}
                      onInputChange={onInputChange}
                    />
                  )}
                </div>
              </div>
              <div>Assigned to {}</div>

              <div className="muteText">Assigned on 01/01/2021 by John Doe </div>
            </div>
            <div className="testCaseCommentSection col-md-6  mb-3">
              <h3>Test Cases</h3>

              <BugTestCases bug={bug} />
              {/* <div className="testCasesContainer border-bottom border-dark pb-3 mb-3">
                <div className=" d-flex mb-1 flex-grow-1 flex-shrink-1 flex-column flex-sm-row border border-dark p-1 bg-light text-dark">
                  <div className="me-3 flex-grow-1 flex-shrink-1">Test Case 1</div>
                  <div className="me-3 flex-shrink-0">Passed</div>
                  <div className="me-3 flex-shrink-1">11/01/2021</div>
                </div>
                <div className=" d-flex  mb-1 flex-grow-1 flex-shrink-1 flex-column flex-sm-row border border-dark p-1 bg-light text-dark">
                  <div className="me-3 flex-grow-1 flex-shrink-1">Test Case 2</div>
                  <div className="me-3 flex-shrink-0">Failed</div>
                  <div className="me-3 flex-shrink-1">10/30/2021</div>
                </div>
              </div> */}

              <div className="form-section">
                <button id="displayCommentsButton" type="button" className="btn btn-secondary mb-3">
                  Display Comments
                </button>
              </div>

              <form id="commentSectionForm" action="/issues" method="post">
                <div className="formSection leaveCommentSection">
                  <h3>Leave A Comment</h3>
                  <div className="mb-3">
                    <label htmlFor="comment-author" className="form-label">
                      Name
                    </label>
                    <input id="comment-author" className="form-control mb-3" name="comment-author" type="text" />
                  </div>
                  <div className="form-section mb-3">
                    <label htmlFor="new-comment-contents" className="form-label">
                      Comment
                    </label>
                    <textarea
                      name="new-comment-contents"
                      id="new-comment-contents"
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-section">
                    <button id="post-comment-btn" type="submit" className="btn btn-primary mb-3 me-3">
                      Post Comment
                    </button>
                    <button id="cancel-comment-btn" type="button" className="btn btn-danger mb-3">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              <div className="commentList">
                <div className="comment mb-3 p-3 border border-light">
                  <div className="comment-header d-flex">
                    <div className="fw-bold comment-author flex-grow-1">David Jenn</div>
                    <div className="fw-bold comment-date">11/11/2011</div>
                  </div>
                  <div className="comment-text">Test Comment two </div>
                </div>
                <div className="comment mb-3 p-3 border border-light">
                  <div className="comment-header d-flex">
                    <div className="fw-bold comment-author flex-grow-1">David Jenn</div>
                    <div className="fw-bold comment-date">11/10/2011</div>
                  </div>
                  <div className="comment-text">This is the first Comment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BugEditor;
