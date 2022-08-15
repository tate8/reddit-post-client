import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import fetch from "cross-fetch"; // for safari

// Jquery and JS to toggle sidebar
let toggleSidebar = () => {
  $(function () {
    document.querySelector("body").classList.toggle("active");
  });
};

function Sidebar() {
  const [data, setData] = useState("loading");

  useEffect(() => {
    // only fetch when we don't have the info
    if (data === "loading") {
      fetch("/account-details")
        .then((res) => res.json())
        .then((data) => {
          setData(data.contents);
        }); // account name is from server file
    }
  });

  let logout = () => {
    console.log("logout clickd");
    fetch("/logout"); // log user out
    window.location.reload(); // reload page
    return false;
  };

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <i
            className="close-sidebar-button fas fa-times fa-2x low-emphasis"
            onClick={toggleSidebar}
          ></i>
          <div className="profile">
            <img src={data.gravitarImage} alt="profile_picture" />
            <p className="high-emphasis item">{data.accountName}</p>
          </div>
          <ul className="sidebar-items">
            <li className="sidebar-item">
              <Link to="/" className="active" onClick={toggleSidebar}>
                <span className="item high-emphasis">
                  <i className="fas fa-home sidebar-icon"></i>
                  <span className="sidebar-icon-text"> Home</span>
                </span>
              </Link>
              <Link to="/user" className="active" onClick={toggleSidebar}>
                <span className="item high-emphasis">
                  <i className="fas fa-user sidebar-icon"></i>
                  <span className="sidebar-icon-text"> Profile</span>
                </span>
              </Link>
              <a onClick={logout} className="active">
                <span className="item high-emphasis">
                  <i className="fa fa-sign-out sidebar-icon" aria-hidden="true"></i>
                  <span className="sidebar-icon-text"> Logout</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
