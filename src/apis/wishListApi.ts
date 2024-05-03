import { createAuthorizationHeader } from '@/utils/cookie'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/wishlist',
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  endpoints: (builder) => ({
    fetchWishListRequest: builder.query<any, void>({
      query: () => ''
    }),
    uploadWishListRequest: builder.mutation({
      query: (wishlist) => ({
        method: 'POST',
        url: '',
        body: { wishlist }
      })
    }),
  })
})

export const { useLazyFetchWishListRequestQuery, useUploadWishListRequestMutation } = wishlistApi
export default wishlistApi