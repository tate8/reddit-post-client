import { createStore } from 'redux';
import rootReducer from '../reducers/index';

// create redux store from root reducer
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)