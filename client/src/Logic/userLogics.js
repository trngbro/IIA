export const getOtherUser = (list, user) => {
    const otherUser = list.find(element => element._id !== user._id);

    if (otherUser) {
        return otherUser;
    } else {
        return null;
    }
};

export const isChatBot = (list) => {
    const bot = list.find(element => element.hd === 'iia.tdtu.edu.vn');
    if (bot)
        return true
    else
        return false
};

export const isUserSign = (userId, userState) => {
    return userId === userState._id
};