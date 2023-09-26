import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/newsletters'
  }),
  endpoints: (builder) => ({
    fetchNewsletterSubscriptionsRequest: builder.query<any, void>({
      query: () => '/all'
    }),
    moderateNewsletterSubscription: builder.mutation({
      query: ({ email, moderation }) => ({
        method: 'POST',
        url: ``,
        body: { email, moderation: moderation || 'sub' }
      })
    }),

  })
})

export const { useLazyFetchNewsletterSubscriptionsRequestQuery, useModerateNewsletterSubscriptionMutation } = newsletterApi

export default newsletterApi