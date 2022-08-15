import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <div className="container login-container">
        <h1>Login</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                {/*  Makes POST request to /login route */}
                <form action="/login" method="POST">
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="username"
                      autofocus
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-light login-button"
                  >
                    Login
                  </button>
                  <Link to="/register" className="btn btn dark">
                    Register instead
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body google-button">
                <a
                  className="btn btn-block google-button-text"
                  href="/auth/google"
                  role="button"
                >
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google logo"
                  ></img>
                  Sign In with Google
                </a>
              </div>
            </div>
            <div className="card">
              <div className="card-body facebook-button">
                <a
                  className="btn btn-block facebook-button-text"
                  href="/auth/facebook"
                  role="button"
                >
                  <img
                    className="facebook-icon"
                    src="https://i.ibb.co/pnpDRC6/facebook.png"
                    alt="Facebook logo"
                  ></img>
                  Sign In with Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
