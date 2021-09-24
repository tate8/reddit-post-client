import search from "./currentSearch"
import auth from "./auth";
import postData from "./postData"
import likedPosts from "./likedPosts"
import changePasswordPopup from "./changePasswordPopup";
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    search,
    auth,
    postData,
    likedPosts,
    changePasswordPopup
});

export default rootReducer