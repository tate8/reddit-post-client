import React from 'react';
import Home from './home/Home';
import User from './user/User'
import Register from './register/Register';
import Login from './login/Login';
import Post from './post/Post';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



function App() // main setup for the app. Route components based off of the url path
{
  return (
    <>
      <Router>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Switch>
          <Route path="/:id" >
          <Post />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;