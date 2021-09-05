import React from "react";
import { Link } from 'react-router-dom';

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
                            <input type="email" class="form-control" name="username" />
                            </div>
                            <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" />
                            </div>
                            <button type="submit" class="btn btn-dark btn-outline-light">Login</button>
                            <Link to="/register" className="btn btn dark">Register instead</Link>
                        </form>

                        </div>
                    </div>
                    </div>

                    <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                        <a class="btn btn-block" href="/auth/google" role="button">
                            <i class="fab fa-google"></i>
                            Sign In with Google
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}

export default LoginForm;