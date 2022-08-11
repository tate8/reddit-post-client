import React from "react";
import $ from "jquery";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadingResult from "./LoadingResult";

let heartAnimation = () => {
  $(".post-heart").on("click", () => {
    $(this).toggleClass("far");
    $(this).toggleClass("fas");
  });
};

function Result(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  let toPost = () => {
    let id = props.postId;
    navigate({ pathname: "/post", search: `?currentPostId=${id}`});
  };
  // display different result formats based off of the post type
  if (props.type === "image") {
    return (
      <>
        <div className="post-group">
          <div className="">
            <img
              className="post-image"
              src={props.src}
              alt={props.src}
              onClick={toPost}
            ></img>
          </div>
          <p onClick={toPost} className="post-title high-emphasis">
            {props.title}
          </p>
          <p onClick={toPost} className="comment-number medium-emphasis">
            <i class="fas fa-comments comment-icon"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "link") {
    let linkTrunc = props.link.substring(0, 25) + "...";
    return (
      <>
        <div className="post-group">
          <div className="row">
              {props.linkThumbnail === "default" ? (
                <div className="bad-thumbnail">
                  <i class="fas fa-unlink" onClick={toPost}></i>
                </div>
              ) : (
                <img
                  className="thumbnail"
                  src={props.linkThumbnail}
                  alt="thumbnail"
                  onClick={toPost}
                ></img>
              )}
              
              <a href={props.link}>
                {linkTrunc} <i className="fas fa-external-link-alt"></i>
              </a>
          </div>
          <p onClick={toPost} className="post-title high-emphasis">
            {props.title}
          </p>
          <p onClick={toPost} className="comment-number medium-emphasis">
            <i class="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "hostedVideo") {
    return (
      <>
        <div className="post-group">
          <video
            width="300"
            height="400"
            controls
            className="video"
            onClick={toPost}
          >
            <source src={props.video_url} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
          <p onClick={toPost} className="post-title high-emphasis">
            {props.title}
          </p>
          <p onClick={toPost} className="comment-number medium-emphasis">
            <i class="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else if (props.type === "richVideo") {
    return (
      <>
        <div className="post-group">
          <div className="col-md-6 post-video-container">
            <img
              className="rich-video"
              src={props.video_url}
              alt="thumbnail"
              onClick={toPost}
            ></img>
          </div>
          <p onClick={toPost} className="post-title high-emphasis">
            {props.title}
          </p>
          <p onClick={toPost} className="comment-number medium-emphasis">
            <i class="fas fa-comments"></i> {props.numComments}
          </p>
        </div>
      </>
    );
  } else {
    return <LoadingResult />;
  }
}

export default Result;
