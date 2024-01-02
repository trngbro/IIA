const init = (localStorage.getItem("userToken") === null) ? {
    info: {
        _doc: {
            picture: ""
        }
    },
    token: null
} : {
    info: JSON.parse(localStorage.getItem("userToken")).user,
    token: JSON.parse(localStorage.getItem("userToken")).data
}



const reducer = (state = init, action) => {
    switch (action.type) {
        case "USER_LOGOUT":
            localStorage.removeItem("userToken");
            localStorage.clear();
            return {}
        case "USER_LOGIN":
            localStorage.setItem("userToken", JSON.stringify(action.payload));

            console.log(action.payload)
            return {
                info: action.payload.user,
                token: action.payload.data
            }
        default:
            return state
    }
};

export default reducer