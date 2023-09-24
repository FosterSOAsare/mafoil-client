import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/transactions'
  }),
  endpoints: (builder) => ({
    fetchTransactions: builder.query<string, any>({
      query: (sort) => `?filter=${sort}`
    })
  })

})

export const { useLazyFetchTransactionsQuery } = transactionApi
export default transactionApi