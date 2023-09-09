import { createSlice } from '@reduxjs/toolkit'

type authSliceType = {
  user: {
    email: string,
    fullname: string,
    balance: number,
    subscribed: boolean,
    id: string
  },
  isLoading: boolean,
  error: null | string
}

const initialState: authSliceType = {
  user: {
    email: '',
    fullname: '',
    balance: 0.00,
    subscribed: false,
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


      state.user = { ...state.user, ...action.payload }
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