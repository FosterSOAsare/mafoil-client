import { createAuthorizationHeader } from "@/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/contact',
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  endpoints: (builder) => ({
    postContactMsgMutation: builder.mutation<any, { message: string, title: string, email: string, ticket: string }>({
      query: ({ message, title, email, ticket }) => ({
        method: 'POST',
        url: '',
        body: { message, title, email, ticket }
      })
    })
  })
})

export const { usePostContactMsgMutationMutation } = contactApi

export default contactApi