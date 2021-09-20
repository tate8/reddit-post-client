const defaultState = {
    query: 'popular',
    recentlySearched: [],
    filter: 'best'
}

const search = (state = defaultState, action) => {
    switch (action.type)
    {
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload,
            }
        case "QUERY_RESULTS_TITLES":
            return {
                ...state,
                postTitles: [...action.payload]
            }
        case "QUERY_RESULTS_SRCS":
            return {
                ...state,
                postSrcs: [...action.payload]
            }
        case "QUERY_RESULTS":
            return {
                ...state,
                results: [...action.payload]
            }
        case "ADD_RECENTLY_SEARCHED":
            return {
                ...state,
                recentlySearched: [...action.payload, ...state.recentlySearched]
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export default search

