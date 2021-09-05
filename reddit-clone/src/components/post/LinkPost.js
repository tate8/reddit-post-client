import React from "react";

function LinkPost(props)
{
    let linkTrunc = props.link.substring(0, 25) + '...';
    return (
        <>
            <div className="post-page-group">
                    <a href={props.link}>{linkTrunc} <i className="fas fa-external-link-alt page-link"></i></a>
                    <img className="page-thumbnail" src={props.linkThumbnail} alt="thumbnail"></img>
                <p className="post-page-title high-emphasis">{props.title}</p>
                <p className="page-comment-number medium-emphasis">from: {props.subreddit}</p>
            </div>
        </>
    )
}

export default LinkPost;