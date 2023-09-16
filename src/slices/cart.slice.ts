import { createSlice } from "@reduxjs/toolkit";
export type cartItemType = {
  count: number;
  name: string;
  price: number;
  rating: number;
  totalRatings: number;
  store: string;
  short_desc?: string;
  _id: string;
  images: { url: string, public_id: string }[];
  slugname: string;
  category: 'cloth' | 'bag' | 'accessories' | 'shoe';
  purchased?: boolean
}

const initialState: cartItemType[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    insertCartData: (state, action) => {
      return action.payload
    },
    reduceItemCount: (state, action) => {
      const { _id } = action.payload
      let cartItem = state.find((item) => item._id === _id)
      if (cartItem?.count === 1) {
        // Remove item from cart
        return state.filter(item => item._id !== _id)
      }
      let newData = state.map(item => item._id === _id ? ({ ...item, count: item.count - 1 }) : item)
      return newData
    },
    increaseItemCount: (state, action) => {
      let { product, count } = action.payload
      count = count ? count : 1
      let cartItem = state.find((item) => item._id === product?._id)
      if (!cartItem) return [...state, { ...product, count }]
      return state.map(item => item._id === product?._id ? { ...item, count: item.count + count } : item)
    },
    removeItem: (state, action) => {
      let { _id } = action.payload
      return state.filter(item => item._id !== _id)
    },

  }
})

export const useCartSelector = (state: any) => state.cart
export const { insertCartData, increaseItemCount, reduceItemCount, removeItem } = cartSlice.actions
export default cartSlice.reducer