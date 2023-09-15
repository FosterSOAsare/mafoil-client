import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      '/api/user'
  }), endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "",
      }),
    })
  })
})

export const { useFetchLoggedInUserRequestQuery } = userApi
export default userApi