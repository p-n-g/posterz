import {configureStore, combineReducers} from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import cartSlice from "./slice/cartSlice";

import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    categorySlice,
    cartSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_NODE_ENV != "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;