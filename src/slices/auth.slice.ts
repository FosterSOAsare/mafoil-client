import { createSlice } from '@reduxjs/toolkit'

type authSliceType = {
  user: {
    email: string,
    username: string,
    balance: number,
    id: string
  },
  isLoading: boolean,
  error: null | string
}

const initialState: authSliceType = {
  user: {
    email: '',
    username: '',
    balance: 0.00,
    id: ''
  },
  isLoading: true,
  error: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload }
    },
    logout: () => {
      return initialState
    },
    setBalance: (state, action) => {
      state.user.balance = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const useAuthSlice = (state: any) => state.auth
export const { setData, logout, setError, setIsLoading } = authSlice.actions

export default authSlice.reducer