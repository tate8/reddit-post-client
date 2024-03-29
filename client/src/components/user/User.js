import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import AccountDetails from "./AccountDetails";
import Sidebar from "../home/Sidebar";
import ChangePassword from "./ChangePassword";

// This grabs the account details from the server and passes them in as props to the AccountDetails component
function User() {
  const [data, setData] = React.useState(null);
  const showChangePasswordPopup = useSelector(
    (state) => state.changePasswordPopup.show
  );

  useEffect(() => {
    fetch("/account-details")
      .then((res) => res.json())
      .then((data) => {
        setData(data.contents);
      }); // account name is from server file
  });

  const location = useLocation(); // get url location
  return (
    <>
      {location.pathname === "/user" && <Sidebar />}
      {location.pathname === "/user" && <Navbar />}
      {location.pathname === "/user" && (
        <AccountDetails
          accountName={!data ? "loading" : data.accountName}
          accountId={!data ? "loading" : data.email}
          // display gravitar image as fallback
          accountProfileImage={
            !data
              ? "loading"
              : !data.selectedImage
              ? data.gravitarImage
              : data.selectedImage
          }
          showSetPassword={showChangePasswordPopup}
        />
      )}

      {location.pathname === "/user" && showChangePasswordPopup && (
        <ChangePassword />
      )}
    </>
  );
}

export default User;
