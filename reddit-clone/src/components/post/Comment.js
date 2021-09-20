import React from "react"

function Comment(props)
{
    return (
        <>
            <div className="comment-container">
                <p className="comment-text medium-emphasis">{props.content}</p>
            </div>
        </>
    )
}

export default Comment