import { setDisplayName } from '@/firebase/api'
import { signOut as _signOut } from '@/firebase/auth'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from 'firebase/auth'

export const AUTH_UNAUTHORIZED_STATUS = 'unauthorized' as const
export const AUTH_AUTHORIZED_STATUS = 'authorized' as const
export const AUTH_LOADING_STATUS = 'loading' as const

type UserAuthStatus =
  | typeof AUTH_UNAUTHORIZED_STATUS
  | typeof AUTH_AUTHORIZED_STATUS
  | typeof AUTH_LOADING_STATUS

export type UserData = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'>

export type UserState = UserData & { status: UserAuthStatus }

export const updateDisplayName = createAsyncThunk(
  'user/updateDisplayName',
  async (displayName: User['displayName']) => {
    await setDisplayName(displayName)
    return displayName
  }
)

export const signOut = createAsyncThunk('user/signOut', _signOut)

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
