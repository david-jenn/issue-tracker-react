import './UserEditor.css'

function UserEditor({ user }) {
  return (
    <div className="text-light">
      <h1>{user.fullName}</h1>
      <div className="textMuted mb-4">Last Updated on 01/01/2021 by John Doe</div>
      <div className="row">
        <div className="userInfoSection col-md-6 mb-3">
          <form id="editUserForm" action="/users" method="put">
            <div className="form-section mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input name="fullName" id="fullName" className="form-control"></input>
            </div>

            <div className="form-section mb-3">
              <label htmlFor="givenName" className="form-label">
                Given Name
              </label>
              <input name="givenName" id="givenName" className="form-control"></input>
            </div>
            <div className="form-section mb-3">
              <label htmlFor="familyName" className="form-label">
                Family Name
              </label>
              <input name="familyName" id="familyName" className="form-control"></input>
            </div>

            <div className="radioSection  p-3 mb-3">
              <h2>Role</h2>
              <div className="radioContainer">
                <div className="form-check me-3">
                  <input className="form-check-input" type="radio" name="roleRadio" id="devRoleCheck"></input>
                  <label className="devRoleCheck" htmlFor="devRoleCheck">
                    Dev
                  </label>
                </div>
                <div className="form-check me-3">
                  <input className="form-check-input" type="radio" name="roleRadio" id="qaRoleCheck"></input>
                  <label className="qaRoleCheck" htmlFor="qaRoleCheck">
                    QA
                  </label>
                </div>
                <div className="form-check me-3">
                  <input className="form-check-input" type="radio" name="roleRadio" id="baRoleCheck"></input>
                  <label className="baRoleCheck" htmlFor="baRoleCheck">
                    BA
                  </label>
                </div>
                <div className="form-check me-3">
                  <input className="form-check-input" type="radio" name="roleRadio" id="pmRoleCheck"></input>
                  <label className="pmRoleCheck" htmlFor="pmRoleCheck">
                    PM
                  </label>
                </div>
                <div className="form-check mb-3 me-3">
                  <input className="form-check-input" type="radio" name="roleRadio" id="tmssRoleCheck"></input>
                  <label className="tmRoleCheck" htmlFor="tmRoleCheck">
                    TM
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section d-flex justify-content-evenly">
              <button id="confirm-user-edit-btn" type="submit" className="btn btn-primary mb-3 me-3">
                Confirm Changes
              </button>
              <button id="cancel-user-edit-btn" type="button" className="btn btn-danger mb-3">
                Cancel Changes
              </button>
            </div>
          </form>
        </div>
        <div className="changePasswordSection col-md-6 p-3 d-flex flex-column">
          <div className="align-self-center mb-3">
            <button className="btn btn-secondary">Reset Password</button>
          </div>
          <form id="changePasswordForm" action="/users" method="put" className=" p-3">
            <h2 className="text-center">Password Reset</h2>
            <div className="form-section mb-3">
              <label htmlFor="modifyCurrentPassword" className="form-label">
                Old Password
              </label>
              <input name="modifyCurrentPassword" id="modifyCurrentPassword" className="form-control"></input>
            </div>
            <div className="form-section mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input name="newPassword" id="newPassword" className="form-control"></input>
            </div>
            <div className="form-section mb-3">
              <label htmlFor="newPasswordConfirm" className="form-label">
                Confirm New Password
              </label>
              <input name="newPasswordConfirm" id="newPasswordConfirm" className="form-control"></input>
            </div>
            <div className="form-section d-flex justify-content-evenly">
              <button id="confirm-password-change-btn" type="submit" className="btn btn-primary mb-3 me-3">
                Change Password
              </button>
              <button id="cancel-password-change-btn" type="button" className="btn btn-danger mb-3">
                Cancel 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEditor;
