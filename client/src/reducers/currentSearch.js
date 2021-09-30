const defaultState = {
    query: 'popular',
    recentlySearched: [],
    filter: 'best',
    results: []
}

const search = (state = defaultState, action) => {
    switch (action.type)
    {
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload,
            }
        case "QUERY_RESULTS":
            return {
                ...state,
                results: [...state.results, ...action.payload]
            }
        case "DELETE_QUERY_RESULTS":
            return {
                ...state,
                results: []
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

