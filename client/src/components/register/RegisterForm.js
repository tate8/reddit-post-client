import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <>
      <div className="container register-container">
        <h1>Register</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                {/*  Makes POST request to /register route  */}
                <form action="/register" method="POST">
                  <div className="form-group">
                    <label for="fullName">Full Name</label>
                    <input
                      type="fullName"
                      className="form-control"
                      name="fullName"
                      required="true"
                      autofocus
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="username"
                      required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required="true"
                    />
                  </div>
                  <div className="form-group">
                    <label for="avatar">Choose a profile picture</label>
                    <input
                      type="file"
                      className="form-control"
                      name="avatar"
                      accept="image/*"
                      id="file"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-light register-button"
                  >
                    Register
                  </button>
                  <Link to="/login" className="btn btn dark">
                    Login instead
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
                    alt="sign in with google"
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
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
                    alt="sign in with facebook"
                    className="facebook-icon"
                    src="https://i.ibb.co/pnpDRC6/facebook.png"
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

export default RegisterForm;
