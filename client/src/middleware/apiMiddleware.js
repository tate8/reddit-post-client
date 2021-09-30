function apiMiddleware({ dispatch }) {
    let userLoggedIn = false

    return next => action => {
        fetch('/logged-in') // fetch backend enpoint to return if user logged in
        .then(res => res.json())
        .then(body => {
            userLoggedIn = body.loggedIn

            if (userLoggedIn) // if user logged in, log action and return action
            {
                if (action.type !== 'SET_LOGGED_IN')
                {
                    dispatch({ type: 'SET_LOGGED_IN', payload: true }) // change user logged in state
                }
                console.log("action", action)
                return next(action)
            }
            else // if user not logged in, return a null action
            {
                // limit user to browsing results, only then let the action through
                if (action.type === 'QUERY_RESULTS' || action.type === 'DELETE_AFTER_LISTINGS' || action.type === 'DELETE_QUERY_RESULTS')
                {
                    return next(action)
                }
                else if (action.type !== 'SET_LOGGED_IN')
                {
                    dispatch({ type: 'SET_LOGGED_IN', payload: false }) // change user logged in state
                    return null
                }
                console.log("action", action)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
 }

export default apiMiddleware