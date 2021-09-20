import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import AccountDetails from './AccountDetails'
import Sidebar from '../home/Sidebar'
import LoadingResult from '../home/LoadingResult'

// This grabs the account details from the server and passes them in as props to the AccountDetails component
function User()
{
    const [data, setData] = React.useState(null)
    const likedPosts = useSelector(state => state.likedPosts.postIds) // eventually move to database

    useEffect(() => {
        console.log("Liked Posts: " + likedPosts + ", type: " + typeof(likedPosts))

      fetch('/account-details') // /account number
        .then((res) => res.json())
        .then((data) => {
            setData(data.contents)
            console.log("data" + data.contents.accountName)
        }) // account name is from server file
    }, [])

    const location = useLocation() // get url location
    return (
        <>
            { location.pathname === '/user' && <Sidebar /> }
            { location.pathname === '/user' && <Navbar /> }
            { location.pathname === '/user' && 
            <AccountDetails accountName={!data ? "loading" : data.accountName} 
                            accountId={!data ? 'loading' : data.email} 
                            likedPosts={!likedPosts.length ? [<LoadingResult />, <LoadingResult />, <LoadingResult />] : likedPosts} /> }
        </>
    )
}

export default User