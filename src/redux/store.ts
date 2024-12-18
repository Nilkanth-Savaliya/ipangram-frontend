//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user-slice";
import departmentsReducer from "./reducer/departments-slice";

const rootReducer = combineReducers({
  user: userReducer,
  departments: departmentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
