import { configureStore, Middleware } from "@reduxjs/toolkit";
import UserReducer from '@/slices/user.slice'
import CartReducer from '@/slices/cart.slice'
import WishListReducer from '@/slices/wishlist.slice'
import authApi from "./apis/authApi";
import userApi from "./apis/userApi";
import productsApi from "./apis/productsApi";
import filesApi from './apis/filesApi'
import cartApi from "./apis/cartApi";
import wishlistApi from "./apis/wishListApi";

const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
  productsApi.middleware,
  filesApi.middleware,
  cartApi.middleware,
  wishlistApi.middleware
]

const makeStore = () => (
  configureStore({
    reducer: {
      user: UserReducer,
      cart: CartReducer,
      wishlist: WishListReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [filesApi.reducerPath]: filesApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [wishlistApi.reducerPath]: wishlistApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

export default makeStore