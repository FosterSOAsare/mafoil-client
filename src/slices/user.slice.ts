import { createSlice } from '@reduxjs/toolkit'

type userSliceType = {
  isLoading: boolean,
  user: {
    email: string,
    fullname: string,
    balance: number,
    subscribed: boolean,
    id: string,
    activated: boolean,
  }, error: null | string
}

const initialState: userSliceType = {
  user: {
    email: '',
    fullname: '',
    balance: 0.00,
    subscribed: false,
    id: '',
    activated: false
  },
  isLoading: true,
  error: null
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    logout: () => {
      return { ...initialState, isLoading: false }
    },
    setBalance: (state, action) => {
      state.user.balance = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }

  }
})

export const useUserSlice = (state: any) => state.user
export const { setData, logout, setIsLoading, setError } = userSlice.actions

export default userSlice.reducer