import { useLocation } from "react-router-dom";
import React from "react";
import SearchNavbar from "./SearchNavbar";
import Sidebar from "./Sidebar";
import Results from "./Results";
import SubredditBox from "../SubredditBox";

function Home() {
  // home page setup. Renders the home components only when the url path is '/'
  const location = useLocation(); // get url location
  return (
    <>
      {location.pathname === "/" && <Sidebar />}
      {location.pathname === "/" && <SearchNavbar />}
      {location.pathname === "/" && <SubredditBox />}
      {location.pathname === "/" && <Results />}
    </>
  );
}

export default Home;
