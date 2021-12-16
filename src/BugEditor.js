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
import BugComments from './components/bug/BugComments';

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [titleHolder, setTitleHolder] = useState('');
  const [error, setError] = useState('');
  const [pageLoadPending, setPageLoadPending] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [assignedTo, setAssignedTo] = useState(null);
  const [assignedOn, setAssignedOn] = useState()

  function updateTitle(value) {
    setTitleHolder(value);
  }
  function updateUserAssigned(value) {
    
  }




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

  function showComments(evt) {
    if(!displayComments) {
      setDisplayComments(true);
    } else {
      setDisplayComments(false);
    }
  }

  

  return (
    <div className="section-container">
      {!auth && <h1 className="text-danger">You do not have permission</h1>}
      {pageLoadPending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {auth && !pageLoadPending && bug && (
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
           
            </div>
            <div className="testCaseCommentSection col-md-6  mb-3">
              <div className="testCaseSection border-bottom border-light mb-5">
                <BugTestCases bug={bug} />
              </div>
              
                <div className="d-grid gap-2">
                <button
                  id="displayCommentsButton"
                  type="button"
                  className="btn btn-secondary mb-3"
                  onClick={(evt) => showComments(evt)}
                >
                  Display Comments
                </button>
                </div>
              
             {displayComments && <div className="commentSection border-bottom border-light mb-3">
                <BugComments auth={auth} bug={bug} showError={showError} showSuccess={showSuccess} />
              </div> }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BugEditor;
