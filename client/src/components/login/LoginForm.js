import React from "react"
import { Link } from 'react-router-dom'

function LoginForm()
{
    return (
        <>
            <div class="container login-container">
                <h1>Login</h1>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="card">
                            <div class="card-body">
                                {/*  Makes POST request to /login route */}
                                <form action="/login" method="POST">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" name="username" autofocus />
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" name="password" />
                                    </div>
                                    <button type="submit" class="btn btn-outline-light login-button">Login</button>
                                    <Link to="/register" className="btn btn dark">Register instead</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body google-button">
                                <a class="btn btn-block google-button-text" href="/auth/google" role="button">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"></img>
                                    Sign In with Google
                                </a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body facebook-button">
                                <a class="btn btn-block facebook-button-text" href="/auth/facebook" role="button">
                                    <img className="facebook-icon" src="https://i.ibb.co/pnpDRC6/facebook.png"></img>
                                    Sign In with Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm