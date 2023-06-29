import { auth } from '@/lib/firebase'
import type { UserData, UserState } from '@/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signOut as _signOut, updateProfile } from 'firebase/auth'

export const AUTH_UNAUTHORIZED_STATUS = 'unauthorized'
export const AUTH_AUTHORIZED_STATUS = 'authorized'
export const AUTH_LOADING_STATUS = 'loading'

export const updateDisplayName = createAsyncThunk(
  'user/updateDisplayName',
  async (displayName: UserData['displayName']) => {
    if (!auth.currentUser) throw new Error('Unauthorized')

    await updateProfile(auth.currentUser, {
      displayName,
      photoURL: auth.currentUser.photoURL,
    })

    return displayName
  }
)

export const signOut = createAsyncThunk('user/signOut', () => _signOut(auth))

const initialState: UserState = {
  uid: '',
  email: null,
  displayName: null,
  photoURL: null,
  status: AUTH_LOADING_STATUS,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {
    setUser: (_, action: PayloadAction<UserData | null>) => {
      const user = action.payload

      if (!user) return { ...initialState, status: AUTH_UNAUTHORIZED_STATUS }

      return {
        ...user,
        status: AUTH_AUTHORIZED_STATUS,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDisplayName.fulfilled, (state, { payload }) => {
        state.displayName = payload
      })
      .addCase(signOut.pending, () => ({
        ...initialState,
        status: AUTH_UNAUTHORIZED_STATUS,
      }))
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
