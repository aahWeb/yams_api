import { configureStore } from '@reduxjs/toolkit'
import { pastriesSlice } from './pastrie'
import { authSlice } from './login'

export const store = configureStore({
  reducer: {
    pastries : pastriesSlice.reducer,
    auth : authSlice.reducer
  },
})