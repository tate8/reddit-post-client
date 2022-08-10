const defaultState = {
  loggedIn: false,
  registered: false,
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "SET_REGISTERED":
      return {
        ...state,
        registered: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
