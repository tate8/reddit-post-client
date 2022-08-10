import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import fetch from "cross-fetch"; // for safari
import Result from "./Result";
import LoadingResult from "./LoadingResult";
import Filter from "../Filter";

function Results() {
  const [data, setData] = useState(1);
  const afterListings = useSelector((state) => state.pagination.afterListings); // for pagination

  const results = useSelector((state) => state.search.results);
  let [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query");
  if (query == null) {
    query = "popular";
  }

  let currentFilter = searchParams.get("filter");
  if (currentFilter == null) {
    currentFilter = "best";
  }

  const dispatch = useDispatch();

  useEffect(() => {
    fetchResults();
  }, [data]);

  useEffect(() => {
    dispatch({ type: "DELETE_AFTER_LISTINGS" }); // reset after listings ids
    dispatch({ type: "DELETE_QUERY_RESULTS" }); // reset results
    fetchResults(true);
  }, [query, currentFilter]);

  let fetchNewPosts = () => {
    setData(Math.random());
  };

  let fetchResults = (fetchFirst) => {
    let results = [];
    let img_url = "";
    let video_url = "";
    let title = "";
    let link = "";
    let type = "";
    let linkThumbnail = "";
    let numComments = "";
    let postId = "";

    let qString = null;
    if (fetchFirst === true || afterListings[afterListings.length - 1] != null) {
      qString =
        "https://www.reddit.com/r/" +
        query +
        "/" +
        currentFilter +
        ".json?limit=10";
    } else {
      qString =
        "https://www.reddit.com/r/" +
        query +
        "/" +
        currentFilter +
        ".json?limit=10&after=" +
        afterListings[afterListings.length - 1];
    }
    console.log(qString)
    fetch(qString)
      .then((response) => response.json())
      .then((body) => {
        console.log(qString);
        for (let i = 0; i < body.data.children.length; ++i) {
          let result = null;
          let child = body.data.children[i];

          if (i % 9 === 0) {
            dispatch({ type: "SET_AFTER_LISTING", payload: child.data.name });
          }

          // if chain for different types of posts
          // Loop through each post from the json gained from the fetch
          // Parse relevant information and pass as props to a result component
          const childData = child.data;
          if (childData.url_overridden_by_dest != null) {
            // check if image or link
            let url = childData.url_overridden_by_dest;
            let urlExtension = url.split(".")[-1];
            const imageUrlTypes = ["png", "jpg", "jpeg"];
            if (imageUrlTypes.includes(urlExtension)) {
              type = "image";
              img_url = url;
              title = childData.title;
              numComments = childData.num_comments;
              postId = childData.id;

              result = (
                <Result
                  src={img_url}
                  title={title}
                  type={type}
                  numComments={numComments}
                  postId={postId}
                />
              );
            } else {
              type = "link";
              link = url;
              title = childData.title;
              linkThumbnail = childData.thumbnail;
              numComments = childData.num_comments;
              postId = childData.id;

              result = (
                <Result
                  title={title}
                  type={type}
                  link={link}
                  linkThumbnail={linkThumbnail}
                  numComments={numComments}
                  postId={postId}
                />
              );
            }
          } else if (
            childData?.secure_media?.reddit_video?.fallback_url != null
          ) {
            type = "hostedVideo";
            title = childData.title;
            video_url = childData.secure_media.reddit_video.fallback_url;
            numComments = childData.num_comments;
            postId = childData.id;

            result = (
              <Result
                title={title}
                type={type}
                video_url={video_url}
                numComments={numComments}
                postId={postId}
              />
            );
          } else if (childData?.secure_media?.oembed?.thumbnail_url != null) {
            type = "richVideo";
            title = childData.title;
            video_url = childData.secure_media.oembed.thumbnail_url;
            numComments = childData.num_comments;
            postId = childData.id;

            result = (
              <Result
                title={title}
                type={type}
                video_url={video_url}
                numComments={numComments}
                postId={postId}
              />
            );
          }
          results.push(result);
        }
        dispatch({ type: "QUERY_RESULTS", payload: results }); // send action to update results
      })
      .catch((err) => {
        console.log(err);
        results = null;
      });
  };

  return (
    <>
      {!query ? (
        <h6 className="query-text disabled">No query</h6>
      ) : (
        <h6 className="query-text disabled">Showing results for {query}</h6>
      )}

      {!results ? (
        <>
          {" "}
          <LoadingResult /> <LoadingResult /> <LoadingResult />{" "}
        </>
      ) : (
        <>
          <Filter />
          {results.map((p) => p)}

          <div className="load-button-container">
            <a className="load-posts-button" onClick={fetchNewPosts}>
              Load more
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default Results;
