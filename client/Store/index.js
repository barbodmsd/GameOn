import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import authSlice from "./Slices/authSlice";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  authSlice,
});

// this name is the name we get from it the all slices
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: { persistedReducer },
});

export default store;