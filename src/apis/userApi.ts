import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      '/api/user'
  }), endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "",
      }),
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
    }),
    updateUserDetailsRequest: builder.mutation({
      query: ({ fullname }) => ({
        url: "/details",
        method: 'PUT',
        body: { fullname }
      }),
    }),
    updateUserPasswordRequest: builder.mutation({
      query: ({ newpassword, oldpassword }) => ({
        url: "/password",
        method: 'PUT',
        body: { newpassword, oldpassword }
      }),
    }),
  })
})

export const {
  useFetchLoggedInUserRequestQuery,
  useLazyActivateUserAccountRequestQuery,
  useWithdrawFundRequestMutation,
  useUpdateUserDetailsRequestMutation,
  useUpdateUserPasswordRequestMutation
} = userApi
export default userApi