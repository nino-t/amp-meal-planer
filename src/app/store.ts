import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "./auth/auth.reducer";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
