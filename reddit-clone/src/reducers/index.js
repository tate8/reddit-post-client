import search from "./currentSearch";
import auth from "./auth";
import postData from "./postData";
import { combineReducers } from "redux";

// only one reducer so no need to combine it with anything
const rootReducer = combineReducers({
    search,
    auth,
    postData
});


export default rootReducer;