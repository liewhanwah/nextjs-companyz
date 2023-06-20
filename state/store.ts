import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import userListReducer from "./login/userListState";
import userReducer from "./login/userState";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  userList: userListReducer,
  userData: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // middleware: [thunk],
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

// ### backup
// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// import userListReducer from "./login/userListState";
// import userReducer from "./login/userState";

// export function makeStore() {
//   return configureStore({
//     reducer: { userList: userListReducer, userData: userReducer },
//   });
// }

// const store = makeStore();

// export type AppState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >;

// export default store;
