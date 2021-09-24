import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { useSelector } from 'react-redux'
import React from 'react'
import Home from './home/Home'
import User from './user/User'
import Register from './register/Register'
import Login from './login/Login'
import Post from './post/Post'

function App() // main setup for the app. Route components based off of the url path
{
  const loggedIn = useSelector(state => state.auth.loggedIn) // is user logged in

  return (
    <>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/user">
          {/* { loggedIn ? <User /> : <Redirect to="/login" /> } */}
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
            {/* { loggedIn ? <Post /> : <Redirect to="/login" /> } */}
            <Post />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App