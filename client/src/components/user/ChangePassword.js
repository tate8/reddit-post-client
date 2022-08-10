import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
function ChangePassword() {
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [passSame, setPassSame] = useState(false);

  const dispatch = useDispatch();

  let closePopup = () => {
    dispatch({ type: "SET_SHOW_POPUP", payload: false });
  };

  let passwordChange = (e) => {
    setPass(e.target.value);
  };

  let confirmPasswordChange = (e) => {
    setConfPass(e.target.value);
  };

  useEffect(() => {
    if (pass === confPass && pass !== "") {
      // will be same at the start when empty
      setPassSame(true);
    } else {
      setPassSame(false);
    }
  }, [confPass, pass]);

  return (
    <>
      <div className="change-password-container">
        <i className="fas fa-times fa-2x close-button" onClick={closePopup}></i>
        <h2 className="title">Change Password</h2>
        <hr className="hr-separator" />
        <div className="row">
          <form action="/change-password" method="post">
            <div className="col-sm-12">
              <label for="oldPassword" className="input-label">
                Old password
              </label>
              <input
                name="oldPassword"
                type="password"
                id="password"
                className="input"
              ></input>
            </div>
            <div className="col-sm-12">
              <label for="newPassword" className="input-label">
                New password
              </label>
              <input
                name="newPassword"
                type="password"
                id="newPassword"
                className="input"
                onChange={passwordChange}
              ></input>
            </div>
            <div className="col-sm-12">
              <label for="confirm-new-password" className="input-label">
                Confirm new password
              </label>
              <input
                name="confirm-new-password"
                type="password"
                id="confirm-newpassword"
                className="input"
                onChange={confirmPasswordChange}
              ></input>
            </div>
            {passSame && (
              <button
                action="submit"
                className="btn confirm-button"
                onClick={closePopup}
              >
                Confirm
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
