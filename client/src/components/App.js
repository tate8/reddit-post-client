import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import Home from "./home/Home";
import User from "./user/User";
import Register from "./register/Register";
import Login from "./login/Login";
import Post from "./post/Post";

function App() {
  // main setup for the app. Route components based off of the url path
  const loggedIn = useSelector((state) => state.auth.loggedIn); // is user logged in

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
