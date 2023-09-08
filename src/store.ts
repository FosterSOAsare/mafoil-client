import { configureStore, Middleware } from "@reduxjs/toolkit";
import AuthReducer from '@/slices/auth.slice'
import authApi from "./apis/authApi";

const middlewares: Array<Middleware> = [authApi.middleware]

const makeStore = () => (
  configureStore({
    reducer: {
      auth: AuthReducer,
      [authApi.reducerPath]: authApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

export default makeStore