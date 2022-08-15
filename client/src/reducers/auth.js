const defaultState = {
  isUserAuth: false,
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_AUTH":
      return {
        ...state,
        isUserAuth: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
