import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/reviews'
  }),
  endpoints: (builder) => ({
    getProductReviewsRequest: builder.query<any, string>({
      query: (slugname) => ({
        url: `/${slugname}`,
        method: 'GET',
      })
    }),
    getPendingProductReviewsRequest: builder.query<any, void>({
      query: () => ({
        url: `/pending`,
        method: 'GET',
      })
    }),
    postProductReviewRequest: builder.mutation({
      query: ({ slugname, data }) => ({
        url: `/${slugname}`,
        method: 'POST',
        body: data
      })
    }),
    moderateProductReviewRequest: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/${_id}`,
        method: 'PUT',
        body: { status }
      })
    })
  })
})

export const {
  useLazyGetProductReviewsRequestQuery,
  usePostProductReviewRequestMutation,
  useLazyGetPendingProductReviewsRequestQuery,
  useModerateProductReviewRequestMutation
} = reviewsApi

export default reviewsApi