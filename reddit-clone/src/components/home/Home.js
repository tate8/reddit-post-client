import React from 'react';
import SearchNavbar from "./SearchNavbar";
import Sidebar from './Sidebar';
import Results from './Results';
import { useLocation } from 'react-router-dom';


function Home() // home page setup. Renders the home components only when the url path is '/'
{
                // get json response from server
                fetch('/reddit')
                .then(res => res.json())
                .then(data => console.log(data))
                .catch((err) => {
                    console.log(err)
                })

    const location = useLocation(); // get url location
    return (
        <>
            { location.pathname === '/' && <Sidebar /> }
            { location.pathname === '/' && <SearchNavbar /> }
            { location.pathname === '/' && <Results /> }
        </>
    )
}

export default Home;