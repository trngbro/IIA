import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"
import reducers from "./reducers/rootReducer";

export const store = legacy_createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)