import search from "./currentSearch";
import auth from "./auth";
import changePasswordPopup from "./changePasswordPopup";
import pagination from "./pagination";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search,
  auth,
  changePasswordPopup,
  pagination,
});

export default rootReducer;
