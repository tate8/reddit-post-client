import React from 'react'
import { Link } from 'react-router-dom'
import test from '../user/test.jpg'
import $ from 'jquery'

// Jquery and JS to toggle sidebar
let toggleSidebar = () =>
{
    $((function() {
        let closeSidebar = document.querySelector(".close-sidebar-button")
        closeSidebar.addEventListener("click", function(){
            document.querySelector("body").classList.toggle("active")
        })
    })
)}

function Sidebar()
{
    toggleSidebar()

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
                    <a onClick={toggleSidebar}>
                    <i class="close-sidebar-button fas fa-times fa-2x low-emphasis"></i>
                    </a>
                    <div class="profile">
                        <img src={test} alt="profile_picture" />
                        <p className="high-emphasis item">Example Name</p>
                    </div>
                    <ul class="sidebar-items">
                        <li class="sidebar-item">
                            <Link to="/user" class="active" onClick={toggleSidebar}>
                                <span class="item high-emphasis"><i class="fas fa-user"></i>Profile</span>
                            </Link>
                            <a onClick={logout} class="active">
                                <span class="item high-emphasis"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar