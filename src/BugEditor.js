import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { moment } from 'moment';

import './BugEditor.css';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

function BugEditor({ auth, showError }) {
  const { bugId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [classification, setClassification] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [closed, setClosed] = useState(null);
  const [pending, setPending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [bug, setBug] = useState(null);

  const canEditAnyBug = auth?.payload?.permissions?.editAnyBug;
  const canClassifyBug = auth?.payload?.permissions?.classifyBug;

  useEffect(() => {
    setPending(true);
    setLoaded(false);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPending(false);
        setLoaded(true);
        console.log(res.data);
        setBug(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStepsToReproduce(res.data.stepsToReproduce);
        setClassification(res.data.classification);
        setAssignedTo(res.data.userAssigned?.fullName);
        setClosed(res.data.closed);
        console.log(title);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, bugId, showError]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
    console.log(typeof newValue);
  }

  function booleanInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    const booleanFlag = newValue.toLowerCase() === 'true' ? true : newValue.toLowerCase() === 'false' ? false : null;
    setValue(booleanFlag);
    console.log(booleanFlag);
    console.log(typeof booleanFlag);
  }

  function onSendEditReq(evt) {
    evt.preventDefault();

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'put',
      data: { title, description, stepsToReproduce },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="sectionContainer">
      {!auth && <h1 className="text-danger">You do not have permission</h1>}

      {auth && (
        <div>
          <h1>{bug?.title}</h1>

          <div className="muteText"> </div>

          <div className="muteText mb-4">
            {bug?.createdBy?.fullName ? `Reported by ${bug?.createdBy?.fullName}` : 'Author not found'}
          </div>

          <div className="pageRow row">
            <div className="bugInfoSection col-md-6">
              <form id="bug-edit-form" action="/issues" method="put">
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

                <div className="classificationStatusAssignContainer mb-3">
                  <div className="classificationSection border-bottom border-light p-3 mb-3">
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
                        checked={classification === 'unapproved' ? true : false}
                        onChange={(evt) => onInputChange(evt, setClassification)}
                      ></input>
                      <label className="form-label" htmlFor="unapprovedCheck">
                        Unapproved
                      </label>
                    </div>

                    <div className="muteText">Classified on 01/01/2021 by John Doe</div>
                  </div>
                  <div className="statusSection border-bottom border-light p-3 mb-3">
                    <h3>Status</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="statusRadio"
                        id="openCheck"
                        value={false}
                        checked={!closed ? true : false}
                        onChange={(evt) => booleanInputChange(evt, setClosed)}
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
                        value={true}
                        onChange={(evt) => booleanInputChange(evt, setClosed)}
                      ></input>
                      <label className="form-label" htmlFor="closedCheck">
                        Closed
                      </label>
                    </div>
                    <div className="muteText">Closed on 01/01/2021 by John Doe</div>
                  </div>
                  <div className="userAssignedSection p-3">
                    <h3>Assigned User</h3>

                    <div className="employeeSearchContainer">
                      <label htmlFor="employeeAssign" className="form-label">
                        Select User
                      </label>
                      <select id="employeeAssign" name="employeeAssign" className="form-select border border-dark mb-3">
                        <option value="johndoe">John Doe</option>
                        <option value="davidjenn">David Jenn</option>
                        <option value="johnsmith">John Smith</option>
                        <option value="steveprice">Steve Price</option>
                      </select>
                    </div>
                    <div>Assigned to John Doe </div>

                    <div className="muteText">Assigned on 01/01/2021 by John Doe </div>
                  </div>
                </div>
                <div className="form-section">
                  <button
                    id="bug-edit-btn"
                    type="submit"
                    className="btn btn-primary mb-3 me-3"
                    onClick={(evt) => onSendEditReq(evt)}
                  >
                    Confirm Changes
                  </button>
                  <button id="cancel-bug-edit-btn" type="button" className="btn btn-danger mb-3">
                    Cancel Changes
                  </button>
                </div>
              </form>
            </div>
            <div className="testCaseCommentSection col-md-6  mb-3">
              <h3>Test Cases</h3>
              <div className="testCasesContainer border-bottom border-dark pb-3 mb-3">
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
              </div>

              <div className="form-section">
                <button id="display-comments-btn" type="button" className="btn btn-secondary mb-3">
                  Display Comments
                </button>
              </div>

              <form id="comment-section-form" action="/issues" method="post">
                <div className="form-section leave-comment-section">
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
