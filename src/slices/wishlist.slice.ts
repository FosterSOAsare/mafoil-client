import { createSlice } from "@reduxjs/toolkit";
export type wishLIstItemType = {
  id: string | number
}

const initialState: wishLIstItemType[] = []

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    insertWishLists: (state, action) => {
      return action.payload
    },
    toggleItemInWishList: (state, action) => {
      const { id } = action.payload;
      let exists = state.find(e => e.id === id)
      if (exists) return state.filter(e => e?.id !== id)
      return [...state, { id }]
    },
  }
})

export const useWishListSelector = (state: any) => state.wishlist
export const { insertWishLists, toggleItemInWishList } = wishListSlice.actions
export default wishListSlice.reducer