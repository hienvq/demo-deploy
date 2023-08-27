import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({ reducer: notificationReducer });
