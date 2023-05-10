import { configureStore } from '@reduxjs/toolkit'
import notes from './slices/notes'
import user from './slices/user'

export const store = configureStore({
  reducer: {
    user,
    notes,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
