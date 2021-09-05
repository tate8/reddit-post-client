import React, { useEffect } from 'react'
import Navbar from './Navbar';
import AccountDetails from './AccountDetails';
import Sidebar from '../home/Sidebar';
import { useLocation } from 'react-router-dom'


function User() // This grabs the account details from the server and passes them in as props to the AccountDetails component
{
    const [data, setData] = React.useState(null);
    useEffect(() => {
      fetch(`/account-details/${13}`) // /account number
        .then((res) => res.json())
        .then((data) => setData(data.contents)); // account name is from server file
    }, []);

    const location = useLocation(); // get url location
    return (
        <>
            { location.pathname === '/user' && <Sidebar /> }
            { location.pathname === '/user' && <Navbar /> }
            { location.pathname === '/user' && <AccountDetails accountName={!data ? "loading" : data.accountName} accountId={!data ? 'loading' : data.id} /> }
        </>
    )
}

export default User;