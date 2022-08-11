import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import $ from "jquery";
import fetch from "cross-fetch"; // for safari

import SearchNavbar from "../home/SearchNavbar";
import Sidebar from "../home/Sidebar";
import HostedPost from "./HostedPost";
import ImagePost from "./ImagePost";
import LinkPost from "./LinkPost";
import RichPost from "./RichPost";
import LoadingResult from "../home/LoadingResult";
import Comment from "./Comment";

// scroll to top of page on reload
$(function () {
  $(window).scrollTop(0);
});

// this componenet will get post data and comments based off of url param 'id' and pass them to the postdata component
function Post() {
  const [result, setResult] = useState(<LoadingResult />); // show loading result before post gets loaded
  let [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query");
  if (query == null) {
    query = "popular";
  }
  const currentPostId = searchParams.get("currentPostId");

  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" || location.pathname !== "/register") {
      fetchResults();
    }
  }, [history]); // fetch result when the url changes

  let fetchResults = () => {
    let img_url = "";
    let video_url = "";
    let title = "";
    let link = "";
    let linkThumbnail = "";
    let numComments = "";
    let postId = "";
    let subreddit = "";
    let tempComments = [];

    fetch("https://www.reddit.com/r/" + query + "/" + currentPostId + ".json")
      .then((response) => response.json())
      .then((body) => {
        for (let i = 0; i < body[0].data.children.length; ++i) {
          let child = body[0].data.children[i];

          const childData = child.data;

          // if chain for different types of posts
          // Loop through each post from the json gained from the fetch. Parse relevant information and pass as props to a result component
          if (childData.post_hint === "image") {
            // childData.author
            img_url = childData.url_overridden_by_dest;
            title = childData.title;
            numComments = childData.num_comments;
            postId = childData.id;
            subreddit = childData.subreddit_name_prefixed;
            setResult(
              <ImagePost
                src={img_url}
                title={title}
                numComments={numComments}
                postId={postId}
                subreddit={subreddit}
              />
            );
          } else if (childData.post_hint === "link") {
            link = childData.url_overridden_by_dest;
            title = childData.title;
            linkThumbnail = childData.thumbnail;
            numComments = childData.num_comments;
            subreddit = childData.subreddit_name_prefixed;

            setResult(
              <LinkPost
                link={link}
                title={title}
                linkThumbnail={linkThumbnail}
                numComments={numComments}
                subreddit={subreddit}
              />
            );
          } else if (childData.post_hint === "hosted:video") {
            title = childData.title;
            video_url = childData.secure_media.reddit_video.fallback_url;
            numComments = childData.num_comments;
            subreddit = childData.subreddit_name_prefixed;

            setResult(
              <HostedPost
                title={title}
                video_url={video_url}
                numComments={numComments}
                subreddit={subreddit}
              />
            );
          } else if (childData.post_hint === "rich:video") {
            title = childData.title;
            video_url = childData.secure_media.oembed.thumbnail_url;
            numComments = childData.num_comments;
            subreddit = childData.subreddit_name_prefixed;

            setResult(
              <RichPost
                title={title}
                video_url={video_url}
                numComments={numComments}
                subreddit={subreddit}
              />
            );
          }

          // here will get the comments for the post
          for (let i = 0; i < body[1].data.children.length; ++i) {
            let comment = body[1].data.children[i];
            let author = comment.data.author;
            let content = comment.data.body;
            let tempComment = <Comment content={content} author={author} />;
            tempComments.push(tempComment);
          }
        }

        setComments(tempComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {<Sidebar />}
      {<SearchNavbar />}
      {result}
      {!comments ? <></> : comments.map((e) => e)}
    </>
  );
}

export default Post;
