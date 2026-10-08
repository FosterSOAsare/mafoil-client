import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: createBaseQuery('/wishlist'),
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