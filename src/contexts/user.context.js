import { createContext, useEffect, useReducer, useState } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase.utils";
import { createAction } from "../utils/reducer.utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

// moving to reducers
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    // console.log("dispatched");
    // console.log(action);
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    // const value = { currentUser, setCurrentUser };

    // moving to reducer
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    // console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = { currentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
