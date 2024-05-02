
import { createSlice } from "@reduxjs/toolkit";


export type notificationType = {
  _id: string;
  desc: string;
  link: string;
  status: string;
}

const initialState: notificationType[] = []

const notificationsSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setNotificationsData: (state, action) => {
      return action.payload
    },
    markNotificationAsRead: (state, action) => {
      const { _id } = action.payload;
      if (!_id) return
      let newData = state.map((item) => item._id === _id ? { ...item, status: 'read' } : item)
      let priority: any = { read: 2, unread: 1 };
      newData.sort((a: notificationType, b: notificationType) => {
        return priority[a.status] - priority[b.status]
      });
      return newData
    },
    insertNewNotification: (state, action) => {
      return [...action.payload, ...state]
    },
    clearNotifications: () => {
      return []
    }
  }
})

export const useNotificationsSelector = (state: any) => state.notifications
export const { setNotificationsData, markNotificationAsRead, insertNewNotification, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer