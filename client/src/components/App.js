import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Home from "./home/Home";
import User from "./user/User";
import Register from "./register/Register";
import Login from "./login/Login";
import Post from "./post/Post";

function App() {
  const dispatch = useDispatch(); 
  dispatch({ type: "REFRESH_USER_AUTH", payload: null})
  const isUserAuth = useSelector((state) => state.auth.isUserAuth);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={ isUserAuth ? <Post /> : <Navigate replace to={"/login"} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
