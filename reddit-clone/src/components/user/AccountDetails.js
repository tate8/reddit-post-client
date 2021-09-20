import React from 'react'
import test from './test.jpg'

// This displays the account details that it has as props (passed from the User.js file)
function AccountDetails(props)
{
    let accountId = props.accountId
    let accountName = props.accountName
    let likedPosts = props.likedPosts

    return (
        <>
            <div className="profile-conatiner" >
                <img className="profile-image" src={test} alt="profile-image"></img>
                <h1 className="account-name high-emphasis">{!accountName ? 'loading' : accountName}</h1>
                <p className="account-id medium-emphasis ">Email: {!accountId ? 'loading' : accountId}</p>
                <hr />
                <p className="account-id medium-emphasis ">Liked posts</p>

{/* LIKED POSTS */}
                <div className="row">
                    {likedPosts.map(e => {
                        <div className="col-lg-4 col-md-6">
                            {e}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default AccountDetails