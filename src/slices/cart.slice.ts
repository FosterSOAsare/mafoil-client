import { createSlice } from "@reduxjs/toolkit";
export type cartItemType = {
  count: number;
  id: string | number
}

const initialState: cartItemType[] = []

const cartSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    insertCartData: (state, action) => {
      return action.payload
    },
    reduceItemCount: (state, action) => {
      const { id } = action.payload
      let cartItem = state.find((item) => item.id === id)
      if (cartItem?.count === 1) {
        // Remove item from cart
        return state.filter(item => item.id !== id)
      }
      let newData = state.map(item => item.id === id ? ({ ...item, count: item.count - 1 }) : item)
      return newData
    },
    increaseItemCount: (state, action) => {
      let { id, count } = action.payload
      count = count ? count : 1
      let cartItem = state.find((item) => item.id === id)
      if (!cartItem) return [...state, { id, count }]
      return state.map(item => item.id === id ? { ...item, count: item.count + count } : item)
    }
  }
})

export const useCartSelector = (state: any) => state.cart
export const { insertCartData, increaseItemCount, reduceItemCount } = cartSlice.actions
export default cartSlice.reducer