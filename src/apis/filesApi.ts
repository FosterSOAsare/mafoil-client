import { createApi } from "@reduxjs/toolkit/query/react";
import createBaseQuery from "@/libs/baseQuery";


const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: createBaseQuery('/files'),
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