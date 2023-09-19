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
    cancelOrderRequest: builder.mutation({
      query: () => ({
        url: "/checkout",
      }),
    })
  })
})

export const { useLazyFetchOrdersRequestQuery, useLazyFetchAnOrderRequestQuery, usePostOrderRequestMutation, useCancelOrderRequestMutation } = orderApi

export default orderApi