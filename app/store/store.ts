import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../apiService/services/authApi";
import authDataReducer from "./slices/authSlice";
import conversationReducer from "./slices/conversationSlice";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { conversationApi } from "../apiService/services/conversationApi";
import { onboardedApi } from "../apiService/services/onboardedApi";
import frontendElementReducer from "./slices/frontendElements";
import onboardedReducer from "./slices/onboardedSlice";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    conversationData: conversationReducer,
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    [onboardedApi.reducerPath]: onboardedApi.reducer,
    frontendElements: frontendElementReducer,
    onboarded: onboardedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(conversationApi.middleware)
      .concat(onboardedApi.middleware),
});

// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
