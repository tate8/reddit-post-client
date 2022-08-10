import React from "react";
import { Link } from "react-router-dom";

function HostedPost(props) {
  return (
    <>
      <div className="post-page-group">
        <div className="back-button">
          <Link to="/">Back</Link>
        </div>
        <video width="400" height="500" controls className="video">
          <source src={props.video_url} type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
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

export default HostedPost;
