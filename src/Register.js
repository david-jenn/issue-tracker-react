

function Register() {
  return (
    <div className="p-3 bg-dark">
      <div className="">
        <h1 className="text-light text-center">Register</h1>
        <form id="loginForm" action="/users" method="get">
          <div className="form-section mb-3">
            <label htmlFor="registerEmail" className="form-label text-light">
              Email
            </label>
            <input name="registerEmail" id="registerEmail" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerConfirmEmail" className="form-label text-light">
              Re-enter Email
            </label>
            <input name="registerConfirmEmail" id="registerConfirmEmail" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerPassword" className="form-label text-light">
              Password
            </label>
            <input name="registerPassword" id="registerPassword" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerConfirmPassword" className="form-label text-light">
              Re-enter Password
            </label>
            <input name="registerConfirmPassword" id="registerConfirmPassword" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerGivenName" className="form-label text-light">
              Given Name
            </label>
            <input name="registerGivenName" id="registerGivenName" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerFamilyName" className="form-label text-light">
              Family Name
            </label>
            <input name="registerFamilyName" id="registerFamilyName" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="registerFullName" className="form-label text-light">
              Full Name
            </label>
            <input name="registerFullName" id="registerFullName" className="form-control"></input>
          </div>












          <div>
            <button id="btn-log-in" type="submit" className="btn btn-primary mb-3">
              Log In
            </button>
            <button id="btn-register" type="button" className="btn btn-danger mb-3">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
