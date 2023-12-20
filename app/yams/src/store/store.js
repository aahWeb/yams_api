import { configureStore } from '@reduxjs/toolkit'
import { pastriesSlice } from './pastrie'
import { meSlice } from './me'

export const store = configureStore({
  reducer: {
    pastries : pastriesSlice.reducer,
    me : meSlice.reducer,
  },
})
