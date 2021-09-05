import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function Navbar() // simple navbar on the user page to be able to get back to the home page
{
    // Jquery and JS to toggle sidebar
    $(document).ready(function() {
        var hamburger = document.querySelector(".hamburger");
        hamburger.addEventListener("click", function(){
            document.querySelector("body").classList.toggle("active");
        })
    })
    return (
        <>
         <nav className="navbar justify-content-between">
            <Link to="/" className="navbar-brand">Reddit 2.0</Link>
            {/* HAMBURGER FOR SIDEBAR */}
			<div class="hamburger">
				<a href="#">
					<i class="fas fa-bars fa-2x"></i>
				</a>
			</div>
        </nav>
        </>
    );
}

export default Navbar;