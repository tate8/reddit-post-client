function validateLoggedIn(text) {
  return function (dispatch) {
    return fetch("https://fancyserver.org/createtodo", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text }),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(createTodo(text));
        }
      })
      .catch((error) => {
        dispatch(errorCreatingTodo(error));
      });
  };
}

export default validateLoggedIn;
