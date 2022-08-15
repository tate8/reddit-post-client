import { useSearchParams } from "react-router-dom";
import React from "react";

function Filter({ query, filter }) {
  let [searchParams, setSearchParams] = useSearchParams();

  let changeFilter = (newFilter) => {
    setSearchParams({ query: query, filter: newFilter });
  };

  return (
    <>
      {/* FILTER OPTION */}
      <div className="filter-container">
        <h6 className="sort-by">Sort by: </h6>
        <div  data-testid="filter-by-best" className={filter === "best" ? "filter-group active" : "filter-group"}>
          <div
            className="item"
            data-testid="filter-by-best-clickable"
            onClick={() => changeFilter("best")}
          >
            <i className="far fa-thumbs-up filter-icon"></i>
            Best
          </div>
        </div>
        <div className={filter === "hot" ? "filter-group active" : "filter-group"}>
          <div
            className="item"
            onClick={() => changeFilter("hot")}
          >
            <i className="fas fa-fire filter-icon"></i>
            Hot
          </div>
        </div>
        <div className={filter === "new" ? "filter-group active" : "filter-group"}>
          <div
            className="item"
            onClick={() => changeFilter("new")}
          >
            <i className="fas fa-stopwatch filter-icon"></i>
            New
          </div>
        </div>
        <div data-testid="filter-by-top" className={filter === "top" ? "filter-group active" : "filter-group"}>
          <div
            
            className="item"
            onClick={() => changeFilter("top")}
          >
            <i className="fas fa-satellite filter-icon"></i>
            Top
          </div>
        </div>
        <div className={filter === "rising" ? "filter-group active" : "filter-group"}>
          <div
            className="item"
            onClick={() => changeFilter("rising")}
          >
            <i className="fas fa-level-up-alt filter-icon"></i>
            Rising
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
