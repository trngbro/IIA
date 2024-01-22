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

export const infoSaved = (user) => {
    return (dispatch) => {
        dispatch({
            type: "INFO_UPDATED",
            payload: user
        })
    }
}

export const getDataSlideChat = () => {
    return (dispatch) => {
        dispatch({
            type: "GET_CHATS_DATA"
        })
    }
}

export const updateDataSlideChat = (user) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_CHATS_DATA",
            payload: user
        })
    }
}

export const fetchDataSlideChat = (allChats) => {
    return (dispatch) => {
        dispatch({
            type: "FETCH_CHATS_DATA",
            payload: allChats
        })
    }
}