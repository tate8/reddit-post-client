const postData = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_POST_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: [action.payload],
      };
    default:
      return state;
  }
};

export default postData;
