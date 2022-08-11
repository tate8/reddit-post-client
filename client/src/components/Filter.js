import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Filter() {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentFilter = searchParams.get("filter");
  if (currentFilter == null) {
    currentFilter = "best";
  }

  let query = searchParams.get("query");
  if (query == null) {
    query = "popular";
  }

  const dispatch = useDispatch();

  let changeFilter = (newFilter) => {
    setSearchParams({ query: query, filter: newFilter });
  };

  return (
    <>
      {/* FILTER OPTION */}
      <div className="filter-container">
        <h6 className="sort-by">Sort by: </h6>
        <div className={currentFilter === "best" ? "filter-group active" : "filter-group"}>
          <a
            className="item"
            onClick={() => changeFilter("best")}
          >
            <i class="far fa-thumbs-up filter-icon"></i>
            Best
          </a>
        </div>
        <div className={currentFilter === "hot" ? "filter-group active" : "filter-group"}>
          <a
            className="item"
            onClick={() => changeFilter("hot")}
          >
            <i class="fas fa-fire filter-icon"></i>
            Hot
          </a>
        </div>
        <div className={currentFilter === "new" ? "filter-group active" : "filter-group"}>
          <a
            className="item"
            onClick={() => changeFilter("new")}
          >
            <i class="fas fa-stopwatch filter-icon"></i>
            New
          </a>
        </div>
        <div className={currentFilter === "top" ? "filter-group active" : "filter-group"}>
          <a
            className="item"
            onClick={() => changeFilter("top")}
          >
            <i class="fas fa-satellite filter-icon"></i>
            Top
          </a>
        </div>
        <div className={currentFilter === "rising" ? "filter-group active" : "filter-group"}>
          <a
            className="item"
            onClick={() => changeFilter("rising")}
          >
            <i class="fas fa-level-up-alt filter-icon"></i>
            Rising
          </a>
        </div>
      </div>
    </>
  );
}

export default Filter;
