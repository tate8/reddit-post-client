import React from 'react'
import { useDispatch } from 'react-redux'
import test from './test.jpg'

// This displays the account details that it has as props (passed from the User.js file)
function AccountDetails(props)
{
    let accountId = props.accountId
    let accountName = props.accountName
    let likedPosts = props.likedPosts
    let show = props.showSetPassword
    let profileImage = props.accountProfileImage

    const dispatch = useDispatch();

    let changePasswordClicked = () => {
        if (show)
        {
            dispatch({ type: 'SET_SHOW_POPUP', payload: false })
        }
        else
        {
            dispatch({ type: 'SET_SHOW_POPUP', payload: true })
        }
    }

    return (
        <>
            <div className="profile-conatiner">
                <div className="profile-image-container">
                    <img className="profile-image" src={!profileImage ? 'loading' : profileImage} alt="profile-image"></img>
                </div>
                <div className="primary-account-details-container">
                    <h1 className="account-name high-emphasis">{!accountName ? 'loading' : accountName}</h1>
                    <p className="account-id medium-emphasis ">Email: {!accountId ? 'loading' : accountId}</p>
                </div>
            </div>
            <div className="account-settings">
                <h3 className="high-emphasis account-settings-title">Account Settings</h3>
                <hr className="hr-separator" />
                <a className="change-password-button" onClick={changePasswordClicked}>Change Password</a>
            </div>
                {/* <p className="account-id medium-emphasis ">Liked posts</p>

                <div className="row">
                    {likedPosts.map(e => {
                        <div className="col-lg-4 col-md-6">
                            {e}
                        </div>
                    })}
                </div> */}
        </>
    )
}

export default AccountDetails