import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingResult from "../LoadingResult";

function Result(props) {
  const navigate = useNavigate();

  const toPost = () => {
    const id = props.postId;
    navigate({ pathname: "/post", search: `?currentPostId=${id}` });
  };

  // display different result formats based off of the post type
  if (props.type === "image") {
    return (
      <>
        <div className="post-group">
          <div className="post-group-clickable" onClick={toPost}></div>
            <img className="post-image" src={props.src} alt={props.src}></img>
          <p className="post-title high-emphasis">{props.title}</p>
          <p className="comment-number medium-emphasis">
            <i className="fas fa-comments comment-icon"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "link") {
    let linkTrunc = props.link.substring(0, 25) + "...";
    return (
      <>
        <div className="post-group">
          <div className="post-group-clickable" onClick={toPost}></div>
          <div className="row">
            {/* Default means that there is no thumbnail*/}
            {props.linkThumbnail === "default" ? (
              <></>
            ) : (
              <>
                <img
                  className="thumbnail"
                  src={props.linkThumbnail}
                  onError={(e) => e.target.style.display = 'none'}
                  alt=""
                ></img>
              </>
            )}
            <a href={props.link}>
              {linkTrunc} <i className="fas fa-external-link-alt"></i>
            </a>
            <p className="post-title high-emphasis">{props.title}</p>
          </div>
          <p className="comment-number medium-emphasis">
            <i className="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "hostedVideo") {
    return (
      <>
        <div className="post-group">
          <video width="300" height="400" controls className="video">
            <source src={props.video_url} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
          <p className="post-title high-emphasis" onClick={toPost}>{props.title}</p>
          <p className="comment-number medium-emphasis">
            <i className="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "richVideo") {
    return (
      <>
        <div className="post-group">
          <div className="col-md-6 post-video-container">
            <video width="300" height="400" controls className="video">
              <source src={props.video_url} type="video/mp4"></source>
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="post-title high-emphasis" onClick={toPost}>{props.title}</p>
          <p className="comment-number medium-emphasis">
            <i className="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else {
    return <LoadingResult />;
  }
}

export default Result;
