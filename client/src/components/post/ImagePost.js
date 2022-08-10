import React from "react";
import { Link } from "react-router-dom";

function ImagePost(props) {
  return (
    <>
      <div className="post-page-group">
        <div className="back-button">
          <Link to="/">Back</Link>
        </div>
        <div className="">
          <img
            className="post-page-image"
            src={props.src}
            alt={props.src}
          ></img>
        </div>
        <p className="post-page-title high-emphasis">{props.title}</p>
        <p className="page-comment-number medium-emphasis">
          {props.numComments} comments
        </p>
        <p className="page-comment-number medium-emphasis">
          from: {props.subreddit}
        </p>
      </div>
    </>
  );
}

export default ImagePost;
