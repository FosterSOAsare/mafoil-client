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
  })
})

export const { useLazyFetchCartRequestQuery, useUploadCartRequestMutation } = cartApi

export default cartApi