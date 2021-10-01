import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() // simple navbar on login page
{
    return (
        <>
            <div className="register-navbar-container">
                <nav className="navbar justify-content-between">
                    <a className="navbar-brand">Reddit 2.0</a>
                    <Link to="/" className="nav-item back-to-home">Back to home</Link>
                </nav>
            </div>
        </>
    );
}

export default Navbar;