import React from "react"
import { Link } from 'react-router-dom'

function LinkPost(props)
{
    let linkTrunc = props.link.substring(0, 25) + '...'
    return (
        <>
            <div className="post-page-group">
                <div className="back-button">
                    <Link to="/">Back</Link>
                </div>
                    <a href={props.link}>{linkTrunc} <i className="fas fa-external-link-alt page-link"></i></a>
                    <img className="page-thumbnail" src={props.linkThumbnail} alt="thumbnail"></img>
                <p className="post-page-title high-emphasis">{props.title}</p>
                <p className="page-comment-number medium-emphasis">from: {props.subreddit}</p>
            </div>
        </>
    )
}

export default LinkPost