import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { moment } from 'moment';
import _, { set } from 'lodash';

import './BugEditor.css';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

function BugEditor({ auth, showError, showSuccess }) {
  const { bugId } = useParams();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [classification, setClassification] = useState('');
  const [assignedToId, setAssignedToId] = useState('');
  const [assignedToFullName, setAssignedToFullName] = useState('');
  const [closed, setClosed] = useState(null);
  const [bug, setBug] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);

  const [pageLoadPending, setPageLoadPending] = useState(false);
  const [editPending, setEditPending] = useState(false);
  const [classificationPending, setClassificationPending] = useState(false);
  const [statusPending, setStatusPending] = useState(false);
  const [assignmentPending, setAssignmentPending] = useState(false);

  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');
  const [classificationSuccess, setClassificationSuccess] = useState('');
  const [classificationError, setClassificationError] = useState('');
  const [statusSuccess, setStatusSuccess] = useState('');
  const [statusError, setStatusError] = useState('');
  const [assignmentSuccess, setAssignmentSuccess] = useState('');
  const [assignmentError, setAssignmentError] = useState('');

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  const canCloseBug = auth?.payload?.permissions?.closeBug;
  const canClassifyBug = auth?.payload?.permissions?.classifyBug;

  const defaultSelectItem = <option value={null}>No User Assigned</option>;
  const userAssignOptions = _.map(users, (x) => (
    <option value={x._id}>
      {x.fullName} {!x.role ? '' : _.isArray(x.role) ? '( ' + _.join(x.role, ', ') + ' )' : '( ' + x.role + ' )'}
    </option>
  ));
  userAssignOptions.unshift(defaultSelectItem);

  useEffect(() => {
    setPageLoadPending(true);
    setLoaded(false);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setPageLoadPending(false);
        setLoaded(true);
        console.log(res.data);
        setBug(res.data);
        setAssignedTo(res.data?.assignedTo);
        console.log('assigned to:', assignedTo);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStepsToReproduce(res.data.stepsToReproduce);
        setClassification(res.data.classification);
        setAssignedToId(res.data.assignedTo?._id);
        setAssignedToFullName(res.data.assignedTo?.fullName);

        setClosed(res.data.closed === true ? 'true' : res.data.closed === false ? 'false' : null);
        console.log(title);
      })
      .catch((err) => {
        console.error(err);
        setPageLoadPending(false);
        setError(err.message);
        showError(err.message);
      });

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
        console.log(_.map(users, (x) => x.fullName));
      })
      .catch((err) => {
        console.log(err);

        setError(err.message);
      });
  }, [auth, bugId, showError]);

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
    console.log(newValue);
  }

  function onSendCloseReq(evt) {
    evt.preventDefault();
    setEditError('');
    setEditSuccess('');
    setClassificationError('');
    setClassificationSuccess('');
    setStatusError('');
    setStatusSuccess('');
    setAssignmentSuccess('');

    setStatusPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/close`, {
      method: 'put',
      data: { closed },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setStatusPending(false);
        setStatusSuccess(res.data.message);
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

  function onSendAssignmentReq(evt) {
    evt.preventDefault();
    setEditError('');
    setEditSuccess('');
    setClassificationError('');
    setClassificationSuccess('');
    setStatusError('');
    setStatusSuccess('');
    setStatusSuccess('');
    setAssignmentSuccess('');
    setAssignmentError('');

    setAssignmentPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/assign`, {
      method: 'put',
      data: { userAssigned: assignedToId },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        setAssignmentPending(false);
        setAssignedTo(_.find(users, (x) => x._id === assignedToId));
        setAssignmentSuccess(res.data.message);
        showSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setAssignmentPending(false);
        const resError = err?.response?.data?.error;

        if (resError) {
          if (typeof resError === 'string') {
            setAssignmentError(resError);
            showError(resError);
            console.log(resError);
          } else if (resError.details) {
            setAssignmentError(_.map(resError.details, (x) => <div>{x.message}</div>));
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

  function onSendClassifyReq(evt) {
    evt.preventDefault();
    setEditError('');
    setEditSuccess('');
    setClassificationError('');
    setClassificationSuccess('');
    setStatusError('');
    setStatusSuccess('');
    setStatusSuccess('');
    setAssignmentSuccess('');

    setClassificationPending(true);

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}/classify`, {
      method: 'put',
      data: { classification },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        setClassificationPending(false);
        setClassificationSuccess(res.data.message);

        showSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setClassificationPending(false);
        const resError = err?.response?.data?.error;

        if (resError) {
          if (typeof resError === 'string') {
            setClassificationError(resError);
            showError(resError);
            console.log(resError);
          } else if (resError.details) {
            setClassificationError(_.map(resError.details, (x) => <div>{x.message}</div>));
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

  function onSendEditReq(evt) {
    evt.preventDefault();
    setEditPending(true);
    setEditError('');
    setEditSuccess('');
    setClassificationError('');
    setClassificationSuccess('');
    setStatusError('');
    setStatusSuccess('');
    setStatusSuccess('');
    setAssignmentSuccess('');

    axios(`${process.env.REACT_APP_API_URL}/api/bug/${bugId}`, {
      method: 'put',
      data: { title, description, stepsToReproduce },
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((res) => {
        setEditPending(false);
        console.log(res);
        showSuccess(res.data.message);
        setEditSuccess(res.data.message);
      })
      .catch((err) => {
        setEditPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setEditError(resError);
            showError(resError);
          } else if (resError.details) {
            setEditError(_.map(resError.details, (x) => <div>{x.message}</div>));
            showError(_.map(resError.details, (x) => x.message));
            for (const detail of resError.details) {
              showError(detail.message);
            }
          } else {
            setEditError(JSON.stringify(resError));
            showError(JSON.stringify(resError));
          }
        } else {
          setEditError(err.message);
          showError('error');
        }
      });
  }

  return (
    <div className="section-container">
      {!auth && <h1 className="text-danger">You do not have permission</h1>}

      {auth && (
        <div>
          <h1>{bug?.title}</h1>

          <div className="muteText mb-4">
            {bug?.createdBy?.fullName ? `Reported by ${bug?.createdBy?.fullName}` : 'Author not found'}
          </div>

          <div className="pageRow row">
            <div className="bugInfoSection col-md-6">
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

                  {editPending && (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {editSuccess && <div className="text-success">{editSuccess}</div>}
                  {editError && <div className="text-danger">{editError}</div>}
                </div>
              </form>

              <div className="classificationStatusAssignContainer mb-3">
                <div className="classificationSection border-bottom border-light p-3 mb-3">
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
                        Confirm Classification
                      </button>
                    )}
                    {classificationPending && (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {classificationSuccess && <div className="text-success">{classificationSuccess}</div>}
                    {classificationError && <div className="text-danger">{classificationError}</div>}

                    <div className="muteText">Classified on 01/01/2021 by John Doe</div>
                  </form>
                </div>
                <div className="statusSection border-bottom border-light p-3 mb-3">
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
                        Confirm Status
                      </button>
                    )}
                    {statusSuccess && <div className="text-success">{statusSuccess}</div>}
                    {statusError && <div className="text-danger">{statusError}</div>}

                    {statusPending && (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}

                    <div className="muteText">Closed on 01/01/2021 by John Doe</div>
                  </form>
                </div>
                <div className="userAssignedSection p-3">
                  <h3>Assigned User</h3>

                  <div className="employeeSearchContainer">
                    <form>
                      <label htmlFor="employeeAssign" className="form-label">
                        Select User
                      </label>

                      <select
                        id="employeeAssign"
                        name="employeeAssign"
                        className="form-select border border-dark mb-3"
                        onChange={(evt) => onInputChange(evt, setAssignedToId)}
                        value={assignedToId ? assignedToId : null}
                        children={userAssignOptions}
                      ></select>
                      {canCloseBug && (
                        <button
                          id="assignmentBugBtn"
                          type="submit"
                          className="btn btn-primary mb-3 me-3"
                          disabled={!canCloseBug}
                          onClick={(evt) => onSendAssignmentReq(evt)}
                        >
                          Confirm Status
                        </button>
                      )}
                      {assignmentSuccess && <div className="text-success">{assignmentSuccess}</div>}
                      {assignmentError && <div className="text-danger">{assignmentError}</div>}

                      {assignmentPending && (
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </form>
                  </div>
                  <div>Assigned to {assignedTo?.fullName}</div>

                  <div className="muteText">Assigned on 01/01/2021 by John Doe </div>
                </div>
              </div>
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
