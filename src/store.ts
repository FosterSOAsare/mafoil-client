import { configureStore, Middleware } from "@reduxjs/toolkit";
import UserReducer from '@/slices/user.slice'
import CartReducer from '@/slices/cart.slice'
import WishListReducer from '@/slices/wishlist.slice'
import NotificationsReducer from '@/slices/notifications.slice'
import authApi from "./apis/authApi";
import userApi from "./apis/userApi";
import productsApi from "./apis/productsApi";
import filesApi from './apis/filesApi'
import cartApi from "./apis/cartApi";
import wishlistApi from "./apis/wishListApi";
import orderApi from "./apis/orderApi";
import transactionApi from "./apis/transactionsApi";
import notificatonsApi from "./apis/notificationsApi";
import newsletterApi from "./apis/newsletterApi";
import reviewsApi from "./apis/reviewsApi";

const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
  productsApi.middleware,
  filesApi.middleware,
  cartApi.middleware,
  wishlistApi.middleware,
  orderApi.middleware,
  transactionApi.middleware,
  notificatonsApi.middleware,
  newsletterApi.middleware,
  reviewsApi.middleware
]

const makeStore = () => (
  configureStore({
    reducer: {
      user: UserReducer,
      cart: CartReducer,
      wishlist: WishListReducer,
      notifications: NotificationsReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [filesApi.reducerPath]: filesApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [wishlistApi.reducerPath]: wishlistApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [transactionApi.reducerPath]: transactionApi.reducer,
      [notificatonsApi.reducerPath]: notificatonsApi.reducer,
      [newsletterApi.reducerPath]: newsletterApi.reducer,
      [reviewsApi.reducerPath]: reviewsApi.reducer
    },

    middleware: (getDefaultMiddleware: any) => (
      getDefaultMiddleware().concat(middlewares)),
  }))

export default makeStore