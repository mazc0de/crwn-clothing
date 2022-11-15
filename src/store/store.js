// store.js akan berisi semua kode redux

import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// root-reducer : berisi semua reducer
import { rootReducer } from "./root-reducer";

// middleware berjalan ketika action sebelum menyentuh reducer
// bisa di lihat melalui console browser
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
