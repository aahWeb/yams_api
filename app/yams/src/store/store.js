import { configureStore } from '@reduxjs/toolkit'
import { pastriesSlice } from './pastrie'
import { meSlice } from './me'
import { loginSlice } from './auth'

// Configuration du store qui devra être transmis au fournisseur redux (<Provider store={store}>) pour accéder à un state globale
export const store = configureStore({
  reducer: {
    pastries : pastriesSlice.reducer,
    me : meSlice.reducer,
    login : loginSlice.reducer
  },
})
