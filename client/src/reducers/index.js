import auth from "./auth";
import changePasswordPopup from "./changePasswordPopup";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  changePasswordPopup
});

export default rootReducer;
