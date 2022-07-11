import { applyMiddleware } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import PlaylistReducer from "./reducers/PlaylistReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducers = combineReducers({
    AuthReducer,
    PlaylistReducer
});

const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;