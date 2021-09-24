const defaultState = {
    show: false
}

const changePasswordPopup = (state = defaultState, action) => {
    switch (action.type)
    {
        case "SET_SHOW_POPUP":
            return {
                ...state,
                show: action.payload,
            }
        default:
            return state
    }
}

export default changePasswordPopup

