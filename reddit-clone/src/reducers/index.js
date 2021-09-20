import search from "./currentSearch"
import auth from "./auth";
import postData from "./postData"
import likedPosts from "./likedPosts"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    search,
    auth,
    postData,
    likedPosts
});

export default rootReducer