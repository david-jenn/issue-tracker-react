import './BugEditor.css'

function BugEditor({ bug }) {
  return (
    <div className="sectionContainer">
      <h1>{bug.title}</h1>
      <div className="muteText">Reported By David Jenn</div>
      <div className="muteText mb-4">Last Updated on 01/01/2021 by John Doe</div>

      <div className="pageRow row">
        <div className="bugInfoSection col-md-6">
          <form id="bug-edit-form" action="/issues" method="put">
            <div className="form-section mb-3">
              <label htmlFor="bugTitle" className="form-label">
                Title
              </label>
              <input name="bugTitle" id="bugTitle" className="form-control"></input>
            </div>

            <div className="form-section mb-3">
              <label htmlFor="bugDescription" className="form-label">
                Description
              </label>
              <textarea name="bugDescription" id="bugDescription" className="form-control" rows="5"></textarea>
            </div>
            <div className="form-section mb-3">
              <label htmlFor="bugSteps" className="form-label">
                Steps To Reproduce
              </label>
              <textarea name="bugSteps" id="bugSteps" className="form-control" rows="5"></textarea>
            </div>

            <div className="classificationStatusAssignContainer mb-3">
              <div className="classificationSection border-bottom border-light p-3 mb-3">
                <h3>Classification</h3>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="classificationRadio" id="devRoleCheck"></input>
                  <label className="devRoleCheck" htmlFor="devRoleCheck">
                    Unclassified
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="classificationRadio" id="qaRoleCheck"></input>
                  <label className="qaRoleCheck" htmlFor="qaRoleCheck">
                    Duplicate
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="classificationRadio" id="baRoleCheck"></input>
                  <label className="baRoleCheck" htmlFor="baRoleCheck">
                    Approved
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" name="classificationRadio" id="pmRoleCheck"></input>
                  <label className="pmRoleCheck" htmlFor="pmRoleCheck">
                    Unapproved
                  </label>
                </div>

                <div className="muteText">Classified on 01/01/2021 by John Doe</div>
              </div>
              <div className="statusSection border-bottom border-light p-3 mb-3">
                <h3>Status</h3>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="statusRadio" id="openBug" />
                  <label className="openBug" htmlFor="openBug">
                    Open
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" name="statusRadio" id="closedBug" />
                  <label className="closeBug" htmlFor="closedBug">
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
              <button id="bug-edit-btn" type="submit" className="btn btn-primary mb-3 me-3">
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
  );
}

export default BugEditor;
