import { configureStore, Middleware } from "@reduxjs/toolkit";
import UserReducer from '@/slices/user.slice'
import CartReducer from '@/slices/cart.slice'
import authApi from "./apis/authApi";
import userApi from "./apis/userApi";

const middlewares: Array<Middleware> = [authApi.middleware, userApi.middleware]

const makeStore = () => (
  configureStore({
    reducer: {
      user: UserReducer,
      cart: CartReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

export default makeStore