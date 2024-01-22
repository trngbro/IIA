import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import chatdataReducer from './chatDataReducer'

const reducers = combineReducers({
    account: accountReducer,
    chats: chatdataReducer
})

export default reducers