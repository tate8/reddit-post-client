import React from "react"
import { Link } from 'react-router-dom'

function RegisterForm()
{
    return (
        <>
        <div class="container register-container">
            <h1>Register</h1>
            <div class="row">
                <div class="col-sm-8">
                    <div class="card">
                        <div class="card-body">
                            {/*  Makes POST request to /register route  */}
                            <form action="/register" method="POST">
                                <div class="form-group">
                                    <label for="fullName">Full Name</label>
                                    <input type="fullName" class="form-control" name="fullName" required="true" autofocus/>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" name="username" required="true" />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" name="password" required="true" />
                                </div>
                                <div class="form-group">
                                    <label for="avatar">Choose a profile picture</label>
                                    <input type="file" class="form-control" name="avatar" accept="image/*" id="file" />
                                </div>
                                <button type="submit" class="btn btn-outline-light register-button">Register</button>
                                <Link to="/login" className="btn btn dark">Login instead</Link>
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

export default RegisterForm