import { createAuthorizationHeader } from "@/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/files',
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  endpoints: (builder) => ({
    uploadAFileRequest: builder.mutation({
      query: ({ file }) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('file', file);
        return {
          url: ``,
          method: 'POST',
          body
        }
      }
    }),
    deleteAFileRequest: builder.mutation({
      query: ({ public_id }) => ({
        url: `/?public_id=${public_id}`,
        method: 'DELETE',
      })
    })
  })
})

export const {
  useDeleteAFileRequestMutation,
  useUploadAFileRequestMutation
} = filesApi

export default filesApi