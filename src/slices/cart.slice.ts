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
    getCartItem: () => {

    },
    reduceItemCount: (state, action) => {
      const { id } = action.payload
      let cartItem = state.find((item) => item.id === id)
      if (cartItem?.count === 1) {
        // Remove item from cart
        return state.filter(item => item.id !== id)
      }
      return state.map(item => item.id === id ? { ...item, count: item.count - 1 } : item)
    },
    increaseItemCount: (state, action) => {
      let { id, count } = action.payload
      count = count ? count : count + 1
      let cartItem = state.find((item) => item.id === id)
      console.log(cartItem)
      if (!cartItem) return [...state, { id, count }]
      return state.map(item => item.id === id ? { ...item, count: item.count + count } : item)
    }
  }
})

export const useCartSelector = (state: any) => state.cart
export const { getCartItem, increaseItemCount, reduceItemCount } = cartSlice.actions
export default cartSlice.reducer