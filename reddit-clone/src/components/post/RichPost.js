import React from "react"

function RichPost(props)
{
    return (
        <>
            <div className="post-page-group">
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