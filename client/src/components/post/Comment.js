import React from "react"

function Comment(props)
{
    return (
        <>
            <div className="comment-container">
                <h5 className="comment-author disabled">{props.author}</h5>
                <p className="comment-text medium-emphasis">{props.content}</p>
            </div>
        </>
    )
}

export default Comment