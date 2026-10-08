import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: createBaseQuery('/newsletters'),
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