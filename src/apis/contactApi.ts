import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/contact'
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