const initState = {
    users: {}
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state
            }

        case 'LOGOUT':
            return {
                ...state
            }

        default:
            return state;
    }

}

export default rootReducer;