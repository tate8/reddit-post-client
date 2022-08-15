import React, { useState, useEffect } from "react";

const DEFAULT_TITLE = "r/popular";
const DEFAULT_DESCRIPTION = "A collection of the most popular reddit posts";

function SubredditBox({ query }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const fetchSubredditDetails = async () => {
      return new Promise((resolve, reject) => {
        if (!query) return;

        if (query === "popular") {
          setIcon("")
          setTitle(DEFAULT_TITLE);
          setDescription(DEFAULT_DESCRIPTION);
          resolve(null);
        } else {
          fetch("https://www.reddit.com/r/" + query + "/about.json")
            .then((res) => res.json())
            .then((body) => {
              if (body.data.over18) {
                window.location.href = "/";
              }

              resolve(body.data);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }
      });
    };

    async function fetchData() {
      const details = await fetchSubredditDetails();
      if (details != null) setDetails(details);
    }
    fetchData();
  }, [query, icon]);

  const setDetails = (subredditDetails) => {
    setTitle(subredditDetails.display_name_prefixed);
    setDescription(subredditDetails.public_description);
    setIcon(subredditDetails.icon_img);
  };

  return (
    <>
      <div className="sr-container">
        <img className="sr-img" src={icon} alt=""></img>
        <h6 data-testid="subreddit-title" className="sr-title high-emphasis">
          {title}
        </h6>
        <p
          data-testid="subreddit-description"
          className="sr-description medium-emphasis"
        >
          {description}
        </p>
      </div>
    </>
  );
}

export default SubredditBox;
