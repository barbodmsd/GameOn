import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./Slices/authSlice";
import storage from "redux-persist/lib/storage";

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

export const persistor = persistStore(store);
export default store;