import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import test from '../user/test.jpg'
import $ from 'jquery'

// Jquery and JS to toggle sidebar
let toggleSidebar = () =>
{
    $((function() {
        document.querySelector("body").classList.toggle("active")
    })
)}

function Sidebar()
{

    const [data, setData] = useState('loading')

    fetch('/account-details')
    .then((res) => res.json())
    .then((data) => {
        setData(data.contents)
    }) // account name is from server file

    let logout = () =>
    {
        console.log("logout clickd")
        fetch('/logout') // log user out
        window.location.reload() // reload page
        return false
    }

    return (
        <>
            <div class="wrapper">
                <div class="sidebar">
                    <i class="close-sidebar-button fas fa-times fa-2x low-emphasis" onClick={toggleSidebar}></i>
                    <div class="profile">
                        <img src={data.profileImage} alt="profile_picture" />
                        <p className="high-emphasis item">{data.accountName }</p>
                    </div>
                    <ul class="sidebar-items">
                        <li class="sidebar-item">
                            <Link to="/" class="active" onClick={toggleSidebar}>
                                <span class="item high-emphasis"><i class="fas fa-home sidebar-icon"></i><span className="sidebar-icon-text"> Home</span></span>
                            </Link>
                            <Link to="/user" class="active" onClick={toggleSidebar}>
                                <span class="item high-emphasis"><i class="fas fa-user sidebar-icon"></i><span className="sidebar-icon-text"> Profile</span></span>
                            </Link>
                            <a onClick={logout} class="active">
                                <span class="item high-emphasis"><i class="fa fa-sign-out sidebar-icon" aria-hidden="true"></i><span className="sidebar-icon-text"> Logout</span></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar