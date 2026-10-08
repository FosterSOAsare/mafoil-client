import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: createBaseQuery('/user'),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "",
      }),
      providesTags: () => [{ type: 'User' }]
    }),
    activateUserAccountRequest: builder.query<any, void>({
      query: () => ({
        url: "/activate",
      }),
    }),
    withdrawFundRequest: builder.mutation({
      query: ({ amount, address }) => ({
        url: "/withdraw",
        method: "POST",
        body: { amount, address }
      }),
      invalidatesTags: [{ type: 'User' }]
    }),
    updateUserDetailsRequest: builder.mutation({
      query: ({ fullname }) => ({
        url: "/details",
        method: 'PUT',
        body: { fullname },
      }),
      invalidatesTags: [{ type: 'User' }]
    }),
    updateUserPasswordRequest: builder.mutation({
      query: ({ newpassword, oldpassword }) => ({
        url: "/password",
        method: 'PUT',
        body: { newpassword, oldpassword }
      }),
    }),
    createDepositCheckoutSessionRequest: builder.mutation<{ url: string }, { amount: number }>({
      query: ({ amount }) => ({
        url: "/deposit-checkout",
        method: 'POST',
        body: { amount }
      }),
    }),
    validateSessionPayment: builder.mutation<{ success: boolean }, { session_id: string }>({
      query: ({ session_id }) => ({
        url: `/validate-checkout`,
        method: 'PUT',
        body: { sessionId: session_id }
      }),
      invalidatesTags: [{ type: 'User' }]
    })
  })
})

export const {
  useFetchLoggedInUserRequestQuery,
  useLazyActivateUserAccountRequestQuery,
  useWithdrawFundRequestMutation,
  useUpdateUserDetailsRequestMutation,
  useUpdateUserPasswordRequestMutation,
  useCreateDepositCheckoutSessionRequestMutation,
  useValidateSessionPaymentMutation
} = userApi
export default userApi