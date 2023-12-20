const init = (localStorage.getItem("userToken") === null) ? {} : JSON.parse(localStorage.getItem("userToken"))

const reducer = (state = init, action) => {
    switch (action.type) {
        case "USER_LOGOUT":
            localStorage.removeItem("userToken");
            localStorage.clear();
            return {}
        case "USER_LOGIN":
            localStorage.setItem("userToken", JSON.stringify(action.payload));
            return {
                ...action.payload
            }
        default:
            return state
    }
};

export default reducer