import { FirebaseError } from 'firebase/app'

export type AuthErrorCodeKey = keyof typeof authErrors

export const authErrors = {
  'auth/email-already-exists': 'The provided email is already in use',
  'auth/internal-error': 'Server encountered an unexpected error',
  'auth/invalid-credential': 'Invalid credentials',
  'auth/invalid-email': 'Invalid email',
  'auth/invalid-password': 'Invalid password',
  'auth/invalid-photo-url': 'Invalid photo url',
  'auth/operation-not-allowed': 'Not allowed',
  'auth/user-not-found': 'User not found',
  'auth/account-exists-with-different-credential':
    'Account exists with different credential',
}

export const getAuthErrorMsg = (err: unknown): string => {
  let msg = 'Something went wrong, try again'

  if (err instanceof FirebaseError && err.code in authErrors) {
    msg = authErrors[err.code as AuthErrorCodeKey]
  }

  return msg
}
