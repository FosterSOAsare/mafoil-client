import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products'
  }),
  endpoints: (builder) => ({
    getProductsRequest: builder.query({
      query: ({ page, category }) => ({
        url: '',
        method: 'GET',
        params: { page, category }
      })
    }),
    getAProductRequest: builder.query({
      query: (slugname) => ({
        url: `/${slugname}`,
        method: 'GET',
      })
    }),
    getEditPageProductRequest: builder.query({
      query: (slugname) => ({
        url: `/edit/${slugname}`,
        method: 'GET',
      })
    }),
    postAProductRequest: builder.mutation({
      query: ({ name, price, category, store, long_desc, short_desc, images }) => ({
        url: ``,
        method: 'POST',
        body: { name, price, category, store, long_desc, short_desc, images }
      })
    }),
    updateAProductRequest: builder.mutation({
      query: ({ data, slugname }) => ({
        url: `/${slugname}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteAProductRequest: builder.mutation({
      query: ({ productId }) => ({
        url: `/${productId}`,
        method: 'DELETE',
      })
    }),
    getCategoriesDataRequest: builder.query<any, void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      })
    }),
    getProductRecommendationsRequest: builder.query<any, string>({
      query: (slugname) => ({
        url: `/${slugname}/recommendations`,
        method: 'GET',
      })
    }),
    getRecentProductsRequest: builder.mutation<any, string[]>({
      query: (recents) => ({
        url: `/recents`,
        method: 'POST',
        body: { recents }
      })
    }),
  })
})

export const {
  useLazyGetProductsRequestQuery,
  useLazyGetAProductRequestQuery,
  useUpdateAProductRequestMutation,
  useDeleteAProductRequestMutation,
  usePostAProductRequestMutation,
  useLazyGetEditPageProductRequestQuery,
  useGetCategoriesDataRequestQuery,
  useLazyGetProductRecommendationsRequestQuery,
  useGetRecentProductsRequestMutation
} = productsApi

export default productsApi