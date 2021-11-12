function Login() {
  return (
    <div className="p-3 bg-dark">
      <div className="">
        <h1 className="text-light text-center">Log In</h1>
        <form id="loginForm" action="/users" method="get">
          <div className="form-section mb-3">
            <label htmlFor="loginEmail" className="form-label text-light">
              Email
            </label>
            <input name="loginEmail" id="loginEmail" className="form-control"></input>
          </div>
          <div className="form-section mb-3">
            <label htmlFor="loginPassword" className="form-label text-light">
              Password
            </label>
            <input name="loginPassword" id="loginPassword" className="form-control"></input>
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

export default Login;
