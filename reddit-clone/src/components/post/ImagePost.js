import React from "react";

function ImagePost(props)
{
    return (
        <>
            <div className="post-page-group">
                <div className="">
                    <img className="post-page-image" src={props.src} alt={props.src}></img>
                </div>
                <p className="post-page-title high-emphasis">{props.title}</p>
                <p className="page-comment-number medium-emphasis">{props.numComments} comments</p>
                <p className="page-comment-number medium-emphasis">from: {props.subreddit}</p>
            </div>
        </>
    )
}

export default ImagePost;