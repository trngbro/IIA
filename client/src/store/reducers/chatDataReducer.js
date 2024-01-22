const init = {
    hello: "Hello World"
}



const reducer = (state = init, action) => {
    switch (action.type) {
        case "GET_CHATS_DATA":
            return state
        case "FETCH_CHATS_DATA":
            console.log(action.payload);
            return action.payload
        case "UPDATE_CHATS_DATA":
            let updatedData = state.data.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, name: action.payload.name };
                }
                return item;
            });

            updatedData = updatedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            return {
                ...state,
                data: updatedData,
            };
        default:
            return state
    }
};

export default reducer