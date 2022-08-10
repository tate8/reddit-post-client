import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import apiMiddleware from "../middleware/apiMiddleware";

// create redux store from root reducer
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(apiMiddleware)
);
