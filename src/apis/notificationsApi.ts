import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const notificatonsApi = createApi({
  reducerPath: 'notificatonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/notifications'
  }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    fetchUserNotificationsRequest: builder.query<any, void>({
      query: () => '',
      providesTags: () => [{ type: 'Notifications' }]
    }),
    markNotificationAsReadRequest: builder.mutation({
      query: (notificationId) => ({
        method: 'PUT',
        url: `/${notificationId}/read`,
      }),
      invalidatesTags: [{ type: 'Notifications' }]
    }),

  })
})

export const { useLazyFetchUserNotificationsRequestQuery, useMarkNotificationAsReadRequestMutation } = notificatonsApi

export default notificatonsApi