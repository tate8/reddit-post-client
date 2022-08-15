import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetch from "cross-fetch"; // for safari
import Result from "./Result";
import LoadingResult from "../LoadingResult";
import Filter from "../Filter";
import SubredditBox from "../SubredditBox";

const MAX_POST_QUERY_AMOUNT = 10;

function Results() {
  const [lastListingId, setLastListingId] = useState("");
  const [results, setResults] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query");
  if (query == null) {
    query = "popular";
  }

  let filter = searchParams.get("filter");
  if (filter == null) {
    filter = "best";
  }

  const fetchResults = () => {
    if (!query || !filter) return;

    let img_url = null;
    let video_url = null;
    let title = null;
    let link = null;
    let type = null;
    let linkThumbnail = null;
    let numComments = null;
    let postId = null;
    const tmpResults = [];

    const qString = `https://www.reddit.com/r/${query}/${filter}.json?limit=${MAX_POST_QUERY_AMOUNT}&after=${lastListingId}`;

    console.log(qString);
    fetch(qString)
      .then((response) => response.json())
      .then((body) => {
        for (let i = 0; i < body.data.children.length; ++i) {
          let result = null;
          let child = body.data.children[i];

          if (i === body.data.children.length - 1) {
            setLastListingId(child.data.name);
          }

          // if chain for different types of posts
          // Loop through each post from the json gained from the fetch
          // Parse relevant information and pass as props to a result component

          // Some posts don't have a post_hint, so we have to have fallbacks

          const childData = child.data;
          const post_hint = childData.post_hint;
          if (
            childData?.secure_media?.reddit_video?.fallback_url != null ||
            post_hint === "hosted:video"
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
                key={lastListingId + i}
              />
            );
          } else if (
            childData?.secure_media?.oembed?.thumbnail_url != null ||
            post_hint === "rich:video"
          ) {
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
                key={lastListingId + i}
              />
            );
          }
          // treat as link or image if not hosted video or rich video
         else if (
            childData.url_overridden_by_dest != null
          ) {
            // check if image or link
            const url = childData.url_overridden_by_dest;
            const urlExtension = url.split(".")[-1];
            const imageUrlTypes = ["png", "jpg", "jpeg"];
            if (imageUrlTypes.includes(urlExtension) || post_hint === "image") {
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
                  key={lastListingId + i}
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
                  key={lastListingId + i}
                />
              );
            }
          }

          if (!!result) tmpResults.push(result);
        }
        setResults((results) => [...results, ...tmpResults]);
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };

  // Basically I want to reset the last listing ID when the query or filter changes
  // Once the last listing ID has been changed, I want to fetch results
  // fetching new posts changes the last listing and the results

  useEffect(() => {
    setResults([]);
    setLastListingId("");
    // now that the last listing ID has changed, the
    // other useEffect will take effect and call fetchResults()
    // once the last listing ID has actually been changed
  }, [query, filter]);

  useEffect(() => {
    if (lastListingId === "") fetchResults();
  }, [lastListingId]);

  return (
    <>
      {!query ? (
        <h6 className="query-text disabled">No query</h6>
      ) : (
        <h6 className="query-text disabled">Showing results for {query}</h6>
      )}

      {results.length === 0 ? (
        <>
          <Filter query={query} filter={filter} />
          <SubredditBox query={query} />
          <LoadingResult />
        </>
      ) : (
        <>
          <Filter query={query} filter={filter} />
          <SubredditBox query={query} />

          {results.map((result) => result)}

          <div className="load-button-container">
            <div className="load-posts-button" onClick={fetchResults}>
              Load more
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Results;
