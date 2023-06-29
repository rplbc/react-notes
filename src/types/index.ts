import type { User } from 'firebase/auth'

export type ResponseMsg = {
  status: 'success' | 'error'
  msg: string
}

export type UserAuthStatus = 'unauthorized' | 'authorized' | 'loading'

export type UserData = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'>

export type UserState = UserData & { status: UserAuthStatus }

export type Note = {
  id: string
  title: string
  content: string
}
