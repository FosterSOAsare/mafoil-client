import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    registerUserRequest: builder.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/register',
        body: data
      }),

    }),
    verifyUserEmailRequest: builder.mutation({
      query: ({ code, email, mode }) => ({
        method: 'POST',
        url: '/verifyEmail',
        body: { code, email, mode }
      }),

    }),
    resendEmailRequest: builder.mutation({
      query: ({ email, mode }: { email: string, mode: string }) => ({
        method: 'POST',
        url: '/resendEmail',
        body: { email, mode }
      })
    }),
    loginRequest: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password }
      }),
    }),
    logoutRequest: builder.query({
      query: () => '/logout'
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: '/changePassword'
      })
    }),
    requestPasswordResetRequest: builder.mutation({
      query: (email) => ({
        method: 'POST',
        url: '/resetPassword',
        body: { email: email }
      })
    }),
    confirmPasswordResetRequest: builder.mutation({
      query: ({ code, newPassword, email }) => ({
        method: 'POST',
        url: '/confirmReset',
        body: { code, newPassword, email }
      })
    }),

  })
})

export const {
  useRegisterUserRequestMutation,
  useResendEmailRequestMutation,
  useVerifyUserEmailRequestMutation,
  useLoginRequestMutation,
  useLogoutRequestQuery,
  useRequestPasswordResetRequestMutation,
  useConfirmPasswordResetRequestMutation,
} = authApi

export default authApi