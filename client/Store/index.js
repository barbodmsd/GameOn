import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable the check
    }),
    // enhancers: [composeWithDevTools()],
});

export const persistor = persistStore(store);
export default store;