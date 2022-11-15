import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

// berisi kumpulan reducer
export const rootReducer = combineReducers({
    user: userReducer,
});
