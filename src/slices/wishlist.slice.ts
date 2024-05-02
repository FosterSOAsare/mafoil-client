
import { productType } from "@/types/product.type";
import { createSlice } from "@reduxjs/toolkit";


const initialState: productType[] = []

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    insertWishLists: (_state, action) => {
      return action.payload
    },
    toggleItemInWishList: (state, action) => {
      const { wishlistItem } = action.payload;
      if (!wishlistItem?._id) return
      let exists = state.find(e => e?._id === wishlistItem?._id)
      if (exists) return state.filter(e => e?._id !== wishlistItem?._id)
      return [...state, wishlistItem]
    },
    clearWishlist: () => {
      return []
    }
  }
})

export const useWishListSelector = (state: any) => state.wishlist
export const { insertWishLists, toggleItemInWishList, clearWishlist } = wishListSlice.actions
export default wishListSlice.reducer