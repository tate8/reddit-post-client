import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import fetch from "cross-fetch"; // for safari

function toggleSidebar() {
  document.querySelector("body").classList.toggle("active");
}

function SearchNavbar() {
  const [queryString, setQueryString] = useState("");
  const [autofills, setAutofills] = useState([]);
  const [recentlySearched, setRecentlySearched] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const isUserAuth = useSelector((state) => state.auth.isUserAuth); // is user logged in

  // get autofill subreddits that match the user's partial query in the searchbar
  useEffect(() => {
    if (queryString !== "") {
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
    }

    if (queryString === "") {
      setAutofills([]);
    }
  }, [queryString]);

  const searchWithQuery = (e) => {
    document.querySelector(".search-input").click()
    e.preventDefault(); // dont reload page

    // add URL param to signify query subreddit
    setSearchParams({ query: queryString, filter: "best" });
    setRecentlySearched((recentlySearched) => [
      ...recentlySearched,
      queryString,
    ]);
  };

  const searchDropdownItemWithQuery = (e) => {
    const dropdownItemText = e.target.innerHTML;
    const searchInput = document.querySelector(".search-input")
    searchInput.value = dropdownItemText;
    searchInput.click();

    // add URL param to signify query subreddit
    setSearchParams({ query: dropdownItemText, filter: "best" });
    setRecentlySearched((recentlySearched) => [
      ...recentlySearched,
      dropdownItemText,
    ]);
  }

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
        <form
          className="form-inline search-form"
          onSubmit={searchWithQuery}
          id="searchForm"
        >
          <div className="dropdown">
            <div
              className="dropdown-menu dropdown-menu-lg-left search-dropdown"
              aria-labelledby="dropdownMenuLink">
              {autofills.length ? (
                <>
                  <h6 className="dropdown-header">Results</h6>
                  {autofills.map((element, index) => {
                    return <div className="dropdown-item" onClick={searchDropdownItemWithQuery} key={index}>{element}</div>; // map all recently searched elements as elements in the dropdown
                  })}
                </>
              ) : <></>}

              {recentlySearched.length <= 0 ? (
                  <div className="dropdown-header">No recently searched</div>
              ) : (
                <>
                  <h6 className="dropdown-header">Recently Searched</h6>

                  {recentlySearched.map((element, index) => {
                    return <div className="dropdown-item" onClick={searchDropdownItemWithQuery}  key={index}>{element}</div>;
                  })}
                </>
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
        {!isUserAuth && (
          <Link to="/login" className="nav-login-button">
            Login
          </Link>
        )}
        {isUserAuth && (
          <div className="hamburger" onClick={toggleSidebar}>
            <i className="fas fa-bars fa-2x"></i>
          </div>
        )}
      </nav>
    </>
  );
}

export default SearchNavbar;
