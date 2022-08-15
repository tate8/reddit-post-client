function apiMiddleware({ dispatch }) {
  return (next) => (action) => {
    /*
     * This will transform a REFRESH_USER_AUTHENTICATED action into
     * the actual user's authentication state
    */
    if (action.type === "REFRESH_USER_AUTH") {
      fetch("/logged-in")
      .then((res) => res.json())
      .then((body) => {
        const isUserAuthenticated = body.loggedIn;

        action.type = "SET_USER_AUTH";
        action.payload = isUserAuthenticated

        return next(action);
      })
      .catch((err) => {
        console.log(err);
      }); 
    }

  };
}

export default apiMiddleware;
