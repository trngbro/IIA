export const getOtherUser = (list, user) => {
    const otherUser = list.find(element => element._id !== user._id);

    if (otherUser) {
        return otherUser;
    } else {
        return null;
    }
};