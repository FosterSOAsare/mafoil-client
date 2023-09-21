import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders'
  }),
  endpoints: (builder) => ({
    fetchOrdersRequest: builder.query<any, string>({
      query: (sort) => ({
        url: `?filter=${sort}`,
      }),
    }),
    fetchAnOrderRequest: builder.query<any, string>({
      query: (orderId) => ({
        url: `/${orderId}`,
      }),
    }),
    postOrderRequest: builder.mutation({
      query: (cart) => ({
        method: 'POST',
        url: '',
        body: { cart }
      })
    }),
    cancelOrderRequest: builder.query<any, string>({
      query: (orderId) => ({
        url: `/cancel/${orderId}`,
      }),
    })
  })
})

export const { useLazyFetchOrdersRequestQuery, useLazyFetchAnOrderRequestQuery, usePostOrderRequestMutation, useLazyCancelOrderRequestQuery } = orderApi

export default orderApi