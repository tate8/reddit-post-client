const defaultState = {
    afterListings: [],
}

const pagination = (state = defaultState, action) => {
    switch (action.type)
    {
        case "SET_AFTER_LISTING":
            return {
                ...state,
                afterListings: [...state.afterListings, action.payload] // add listing to fetch after
            }
        case "DELETE_AFTER_LISTINGS":
            return {
                ...state,
                afterListings: [] // resest after listings
            }
        default:
            return state;
    }
}

export default pagination

