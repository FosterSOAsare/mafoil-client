import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
    populateCartData: builder.query({
      query: (cart) => ({
        method: 'GET',
        url: '/populate',
      })
    })
  })
})

export const { useLazyFetchCartRequestQuery, useUploadCartRequestMutation, useLazyPopulateCartDataQuery } = cartApi

export default cartApi