import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products'
  }),
  endpoints: (builder) => ({
    getProductsRequest: builder.query({
      query: ({ page }) => ({
        url: '',
        method: 'GET',
        params: { page }
      })
    }),
    getAProductRequest: builder.query({
      query: ({ slugname }) => ({
        url: `/${slugname}`,
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
      query: ({ data, productId }) => ({
        url: `/${productId}`,
        method: 'PUT',
        body: { data }
      })
    }),
    deleteAProductRequest: builder.mutation({
      query: ({ productId }) => ({
        url: `/${productId}`,
        method: 'DELETE',
      })
    })
  })
})

export const {
  useGetProductsRequestQuery,
  useGetAProductRequestQuery,
  useUpdateAProductRequestMutation,
  useDeleteAProductRequestMutation,
  usePostAProductRequestMutation
} = productsApi

export default productsApi