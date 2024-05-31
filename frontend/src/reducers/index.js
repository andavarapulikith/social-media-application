import { combineReducers } from "redux";

import authReducer from "./authreducer";
import postReducer from "./postReducer";

export const reducers=combineReducers({authReducer,postReducer});


