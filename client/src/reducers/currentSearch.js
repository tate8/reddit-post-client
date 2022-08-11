const defaultState = {
  query: "popular",
  recentlySearched: [],
  filter: "best",
  results: [],
};

const search = (state = defaultState, action) => {
  switch (action.type) {
    case "QUERY_RESULTS":
      return {
        ...state,
        results: [...state.results, ...action.payload],
      };
    case "DELETE_QUERY_RESULTS":
      return {
        ...state,
        results: [],
      };
    case "ADD_RECENTLY_SEARCHED":
      return {
        ...state,
        recentlySearched: [...action.payload, ...state.recentlySearched],
      };
    default:
      return state;
  }
};

export default search;
