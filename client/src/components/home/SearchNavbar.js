import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import $ from "jquery";
import fetch from "cross-fetch"; // for safari

function toggleSidebar() {
  document.querySelector("body").classList.toggle("active");
}

function SearchNavbar() {
  const [queryString, setQueryString] = useState("");
  const [autofills, setAutofills] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  // get state variables
  const recentlySearched = useSelector(
    (state) => state.search.recentlySearched
  ); // array of recently searched queries
  const loggedIn = useSelector((state) => state.auth.loggedIn); // is user logged in
  const dispatch = useDispatch();

  // get autofill subreddits that match the user's partial query in the searchbar
  useEffect(() => {
    fetch("https://www.reddit.com/reddits/search.json?q=%27" + queryString)
      .then((res) => res.json())
      .then((body) => {
        let results = [];
        let search = queryString.toLowerCase();
        for (let i = 0; i < body.data.children.length; i++) {
          let child = body.data.children[i];
          if (!child.data.over18) {
            if (
              child.data.display_name
                .toLowerCase()
                .substring(0, search.length) === search
            ) {
              results.push(child.data.display_name);
            }
          }
        }
        setAutofills(results);
      })
      .catch((err) => {
        console.log(err);
      });
    if (queryString === "") {
      setAutofills([]);
    }
  }, [queryString]);

  const searchWithQuery = (e) => {
    const input = document.querySelector(".search-input");
    input.click();
    e.preventDefault(); // dont reload page

    // add URL param to signify query subreddit
    setSearchParams({ query: queryString, filter: "best" });

    dispatch({ type: "ADD_RECENTLY_SEARCHED", payload: [queryString] });
  };

  const handleChange = (e) => {
    setQueryString(e.target.value); // what's in the search text input
  };

  return (
    <>
      <nav className="navbar justify-content-between" id="nav">
        <Link to="/" className="navbar-brand">
          Re-Reddit
        </Link>

        {/* SEARCH FORM */}
        <form className="form-inline search-form" onSubmit={searchWithQuery}>
          <div className="dropdown">
            <div
              className="dropdown-menu dropdown-menu-lg-left search-dropdown"
              aria-labelledby="dropdownMenuLink"
            >
              {autofills.length ? (
                <>
                  <h6 class="dropdown-header">Results</h6>
                  {autofills.map((element) => {
                    return (
                      <a className="dropdown-item" href="#">
                        {element}
                      </a>
                    ); // map all recently searched elements as elements in the dropdown
                  })}
                </>
              ) : (
                <></>
              )}
              {recentlySearched.length ? (
                <>
                  <h6 class="dropdown-header">Recently Searched</h6>
                  {!recentlySearched ? (
                    <a className="dropdown-item" href="#">
                      No recently searched
                    </a>
                  ) : (
                    recentlySearched.map((element) => {
                      return (
                        <a className="dropdown-item" href="#">
                          {element}
                        </a>
                      ); // map all recently searched elements as elements in the dropdown
                    })
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <input
            className="form-control mr-sm-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
            data-toggle="dropdown"
          />
          <div
            className=" my-2 my-sm-0 search-button"
            onClick={searchWithQuery}
          >
            <i className="fas fa-search search-icon"></i>
          </div>
        </form>

        {/* LOGIN AND REGISTER BTNS IF USER ISN'T AUTHENITCATED */}
        {!loggedIn && (
          <Link to="/login" className="nav-login-button">
            Login
          </Link>
        )}
        {loggedIn && (
          <div class="hamburger" onClick={toggleSidebar}>
            <i class="fas fa-bars fa-2x"></i>
          </div>
        )}
      </nav>
    </>
  );
}

export default SearchNavbar;
