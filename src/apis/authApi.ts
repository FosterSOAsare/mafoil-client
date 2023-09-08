import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/auth' }),
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
        url: '/login',
        body: { code, email, mode }
      }),

    }),
    resendEmailRequest: builder.mutation({
      query: ({ email, mode }: { email: string, mode: string }) => ({
        method: 'POST',
        url: '/resendEmail',
        data: { email, mode }
      })
    }),
    logoutRequest: builder.query({
      query: () => '/logout'
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: '/changePassword'
      })
    })
  })
})

export const { useRegisterUserRequestMutation, useResendEmailRequestMutation, useVerifyUserEmailRequestMutation, useLogoutRequestQuery } = authApi

export default authApi