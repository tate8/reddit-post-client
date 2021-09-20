const defaultState = {
    postIds: []
}

const likedPosts = (state = defaultState, action) => {
    switch (action.type)
    {
        case "SET_LIKED_POST_IDS":
            return {
                ...state,
                postIds: [...state.postIds, ...action.payload],
            }
        default:
            return state;
    }
}

export default likedPosts

