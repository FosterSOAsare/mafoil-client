import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQuery from '@/libs/baseQuery'

const notificatonsApi = createApi({
  reducerPath: 'notificatonsApi',
  baseQuery: createBaseQuery('/notifications'),
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