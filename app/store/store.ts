import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../apiService/services/authApi";
import authDataReducer from "./slices/authSlice";
import conversationReducer from "./slices/conversationSlice";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { conversationApi } from "../apiService/services/conversationApi";
import frontendElementReducer from "./slices/frontendElements";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    conversationData: conversationReducer,
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    frontendElements: frontendElementReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(conversationApi.middleware),
});

// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
