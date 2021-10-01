import React from "react"
import { Link } from 'react-router-dom'

function RichPost(props)
{
    return (
        <>
            <div className="post-page-group">
                <div className="back-button">
                    <Link to="/">Back</Link>
                </div>
                <div className="col-md-6 post-video-container">
                    <img className="rich-video" src={props.video_url} alt="thumbnail"></img>
                </div>
                <p className="post-page-title high-emphasis">{props.title}</p>
                <p className="page-comment-number medium-emphasis">from: {props.subreddit}</p>
            </div>
        </>
    )
}

export default RichPost