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
    getATransactionRequest: builder.query<any, any>({
      query: (id) => `/${id}`
    }),
    // Admin decision on a pending withdrawal
    decideWithdrawalRequest: builder.mutation<{ success: boolean; status: string }, { id: string; decision: "approve" | "reject" }>({
      query: ({ id, decision }) => ({ url: `/${id}/${decision}`, method: 'PUT' })
    }),
  })

})

export const { useLazyFetchTransactionsQuery, useLazyAdminFetchTransactionsQuery, useLazyGetATransactionRequestQuery, useDecideWithdrawalRequestMutation } = transactionApi
export default transactionApi