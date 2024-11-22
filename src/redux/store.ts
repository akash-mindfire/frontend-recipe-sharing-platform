import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import { api } from "../services/api";

// Configure Redux store with auth, user, and api reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer, // api reducer for the API service
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // include the api middleware
});

// RootState type representing the entire Redux state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;

// Typed hooks for dispatching actions and selecting state
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
