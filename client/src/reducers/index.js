import search from "./currentSearch";
import auth from "./auth";
import postData from "./postData";
import likedPosts from "./likedPosts";
import changePasswordPopup from "./changePasswordPopup";
import pagination from "./pagination";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search,
  auth,
  postData,
  likedPosts,
  changePasswordPopup,
  pagination,
});

export default rootReducer;
