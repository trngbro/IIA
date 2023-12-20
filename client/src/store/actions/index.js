export const logoutSaved = () => {
    return (dispatch) => {
        dispatch({
            type: "USER_LOGOUT"
        })
    }
}

export const loginSaved = (user) => {
    return (dispatch) => {
        dispatch({
            type: "USER_LOGIN",
            payload: user
        })
    }
}