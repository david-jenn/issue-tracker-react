function Register() {
  return (
    <div className="p-3 text-light">
      
        <h1 className=" text-center">Register</h1>
        <form id="loginForm" action="/users" method="get" className="row">
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerEmail" className="form-label">
              Email
            </label>
            <input name="registerEmail" id="registerEmail" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerConfirmEmail" className="form-label">
              Re-enter Email
            </label>
            <input name="registerConfirmEmail" id="registerConfirmEmail" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerPassword" className="form-label">
              Password
            </label>
            <input name="registerPassword" id="registerPassword" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerConfirmPassword" className="form-label">
              Re-enter Password
            </label>
            <input name="registerConfirmPassword" id="registerConfirmPassword" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerGivenName" className="form-label">
              Given Name
            </label>
            <input name="registerGivenName" id="registerGivenName" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerFamilyName" className="form-label">
              Family Name
            </label>
            <input name="registerFamilyName" id="registerFamilyName" className="form-control"></input>
          </div>
          <div className="form-section mb-3 col-md-6">
            <label htmlFor="registerFullName" className="form-label">
              Full Name
            </label>
            <input name="registerFullName" id="registerFullName" className="form-control"></input>
          </div>

          <div className="d-flex justify-content-evenly">
            <button id="btn-log-in" type="submit" className="btn btn-primary mb-3">
              Register Account
            </button>
            <button id="btn-register" type="button" className="btn btn-danger mb-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
    
  );
}

export default Register;
