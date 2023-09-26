import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const notificatonsApi = createApi({
  reducerPath: 'notificatonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/notifications'
  }),
  endpoints: (builder) => ({
    fetchUserNotificationsRequest: builder.query<any, void>({
      query: () => ''
    }),
    markNotificationAsReadRequest: builder.mutation({
      query: (notificationId) => ({
        method: 'PUT',
        url: `/${notificationId}/read`,
      })
    }),

  })
})

export const { useLazyFetchUserNotificationsRequestQuery, useMarkNotificationAsReadRequestMutation } = notificatonsApi

export default notificatonsApi