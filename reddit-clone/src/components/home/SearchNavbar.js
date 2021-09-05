import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import gsap from 'gsap';

class HoverButton {
    constructor(el) {
      this.el = el;
      this.hover = false;
      this.calculatePosition();
      this.attachEventsListener();
    }
    
    attachEventsListener() {
      window.addEventListener('mousemove', e => this.onMouseMove(e));
      window.addEventListener('resize', e => this.calculatePosition(e));
    }
    
    calculatePosition() {
      gsap.set(this.el, {
        x: 0,
        y: 0,
        scale: 1
      });
      const box = this.el.getBoundingClientRect();
      this.x = box.left + (box.width * 0.5);
      this.y = box.top + (box.height * 0.5);
      this.width = box.width;
      this.height = box.height;
    }
    
    onMouseMove(e) {
      let hover = false;
      let hoverArea = (this.hover ? 0.7 : 0.5);
      let x = e.clientX - this.x;
      let y = e.clientY - this.y;
      let distance = Math.sqrt( x*x + y*y );
      if (distance < (this.width * hoverArea)) {
         hover = true;
          if (!this.hover) {
            this.hover = true;
          }
          this.onHover(e.clientX, e.clientY);
      }
      
      if(!hover && this.hover) {
        this.onLeave();
        this.hover = false;
      }
    }
    
    onHover(x, y) {
      gsap.to(this.el,  {
        x: (x - this.x) * 0.4,
        y: (y - this.y) * 0.4,
        scale: 1.15,
        ease: 'power2.out',
        duration: 0.4
      });
      this.el.style.zIndex = 10;
    }
    onLeave() {
      gsap.to(this.el, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)',
        duration: 0.7
      });
      this.el.style.zIndex = 1;
    }
  }
  

  

function SearchNavbar()
{
    // Jquery and JS to toggle sidebar
    $(document).ready(function() {
        // make the search button follow mouse
        const searchBtn = document.querySelector('.search-button');
        new HoverButton(searchBtn);

        var hamburger = document.querySelector(".hamburger");
        if (hamburger) { // if the user isn't logged in, the hamburger won't be renderd
            hamburger.addEventListener("click", function(){
                document.querySelector("body").classList.toggle("active");
                $(".cover-content").toggleClass('active');
            })
        }
    })

    let queryString = '';

    // get state variables =
    const recentlySearched = useSelector(state => state.search.recentlySearched); // array of recently searched queries
    const loggedIn = useSelector(state => state.auth.loggedIn); // is user logged in
    const registered = useSelector(state => state.auth.registered); // is user registered
    const dispatch = useDispatch();

    const searchButtonClicked = (e) => {
        e.preventDefault(); // dont reload page
        dispatch({ type: "SET_QUERY", payload: queryString }); // set query on search btn click
        dispatch({ type: 'ADD_RECENTLY_SEARCHED', payload: [queryString] }); // add item to recently searched on search btn click
    }
    let handleChange = (e) => {
        queryString = e.target.value; // what's in the search text input
    }


    return (
        <>
         <nav className="navbar justify-content-between">
            <Link to="/" className="navbar-brand">Reddit 2.0</Link>

{/* SEARCH FORM */}
            <form className="form-inline search-form">
                <div className="dropdown">
                    <div className="dropdown-menu dropdown-menu-lg-left search-dropdown" aria-labelledby="dropdownMenuLink">
                        <h6 class="dropdown-header">Recently Searched</h6>
                        <div class="dropdown-divider"></div>
                        {!recentlySearched 
                        ? <a className="dropdown-item" href="#">No recently searched</a>
                        : 
                        recentlySearched.map((element) => {
                            return <a className="dropdown-item" href="#">{element}</a> // map all recently searched elements as elements in the dropdown
                        })}
                    </div>
                </div>
                <input className="form-control mr-sm-2 search-input" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} data-toggle="dropdown" />
                <div className=" my-2 my-sm-0 search-button" onClick={searchButtonClicked} ><i class="fas fa-search search-icon"></i></div>


            </form>
            

{/* LOGIN AND REGISTER BTNS IF USER ISN'T AUTHENITCATED */}
            { !loggedIn && <Link to="/login" className="btn btn-outline-light">Login</Link> }

            { !registered && !loggedIn &&<Link to="/register" className="btn btn-outline-light">Register</Link> }

            { loggedIn && 
            <div class="hamburger">
					<i class="fas fa-bars fa-2x"></i>
			</div>
            }
        </nav>
        </>
    );
}

export default SearchNavbar;