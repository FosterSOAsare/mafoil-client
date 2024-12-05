import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import userApi from './userApi';
import { createAuthorizationHeader } from '@/utils/cookie';


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth', prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.invalidateTags(["User"]));
      },
    }),
    logoutRequest: builder.query<{}, void>({
      query: () => '/logout',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.invalidateTags(["User"]));
      },
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
  useLazyLogoutRequestQuery,
  useRequestPasswordResetRequestMutation,
  useConfirmPasswordResetRequestMutation,
} = authApi

export default authApi