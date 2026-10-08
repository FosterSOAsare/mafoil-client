import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: createBaseQuery('/orders'),
  tagTypes: ['Order', 'Orders'],
  endpoints: (builder) => ({
    fetchOrdersRequest: builder.query<any, string>({
      query: (sort) => ({
        url: `?filter=${sort}`,
      }),
      providesTags: () => [{ type: 'Orders' }]
    }),
    fetchAnOrderRequest: builder.query<any, string>({
      query: (orderId) => ({
        url: `/${orderId}`,
      }),
      providesTags: (orderId) => [{ type: 'Order', id: orderId }],
    }),
    postOrderRequest: builder.mutation({
      query: (cart) => ({
        method: 'POST',
        url: '',
        body: { cart }
      })
    }),
    cancelOrderRequest: builder.mutation<any, string>({
      query: (orderId) => ({
        url: `/cancel/${orderId}`,
        method: 'POST'
      }),
      invalidatesTags: ({ orderId }) => [{ type: 'Order', id: orderId }]
    }),
    adminFetchOrdersRequests: builder.query<any, string>({
      query: (sort) => ({
        url: `/admin?filter=${sort}`,
      }),
    }),
  })
})

export const { useLazyFetchOrdersRequestQuery, useLazyFetchAnOrderRequestQuery, usePostOrderRequestMutation, useCancelOrderRequestMutation, useLazyAdminFetchOrdersRequestsQuery } = orderApi

export default orderApi