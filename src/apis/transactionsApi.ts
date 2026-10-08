import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: createBaseQuery('/transactions'),
  endpoints: (builder) => ({
    fetchTransactions: builder.query<string, any>({
      query: (sort) => `?filter=${sort}`
    }),
    adminFetchTransactions: builder.query<string, any>({
      query: (sort) => `/admin?filter=${sort}`
    }),
    getATransactionRequest: builder.query<string, any>({
      query: (id) => `/${id}`
    }),
  })

})

export const { useLazyFetchTransactionsQuery, useLazyAdminFetchTransactionsQuery, useLazyGetATransactionRequestQuery } = transactionApi
export default transactionApi