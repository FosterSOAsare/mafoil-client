import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQuery from "@/libs/baseQuery";

const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: createBaseQuery('/contact'),
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