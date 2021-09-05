import React from 'react';
import test from './test.jpg';

function AccountDetails(props) // This displays the account details that it has as props (passed from the User.js file)
{
    let accountId = props.accountId;
    let accountName = props.accountName;

    return (
        <>
            <div className="profile-conatiner" >
                <img className="profile-image" src={test} alt="profile-image"></img>
                <h1 className="account-name high-emphasis">{!accountName ? 'loading' : accountName}</h1>
                <p className="account-id medium-emphasis ">Id: {!accountId ? 'loading' : accountId}</p>
                <hr />
            </div>
        </>
    )
}

export default AccountDetails;