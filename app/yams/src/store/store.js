import { configureStore } from '@reduxjs/toolkit'
import { pastriesSlice } from './pastrie'

export const store = configureStore({
  reducer: {
    pastries : pastriesSlice.reducer
  },
})