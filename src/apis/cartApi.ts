import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import userApi from './userApi';

const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/cart'
  }),
  endpoints: (builder) => ({
    fetchCartRequest: builder.query<any, void>({
      query: () => ({
        url: "",
      }),
    }),
    uploadCartRequest: builder.mutation({
      query: (cart) => ({
        method: 'POST',
        url: '',
        body: { cart }
      })
    }),
    checkoutCartRequest: builder.query<any, void>({
      query: () => ({
        url: "/checkout",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.invalidateTags(["User"]));
      },
    })
  })
})

export const { useLazyFetchCartRequestQuery, useUploadCartRequestMutation, useLazyCheckoutCartRequestQuery } = cartApi

export default cartApi