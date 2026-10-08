import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'
import userApi from './userApi';

const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: createBaseQuery('/cart'),
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
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(["User"]));
        } catch {
          // The error is shown by the component through the hook's `error`
        }
      },
    })
  })
})

export const { useLazyFetchCartRequestQuery, useUploadCartRequestMutation, useLazyCheckoutCartRequestQuery } = cartApi

export default cartApi