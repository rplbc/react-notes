import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signOut as _signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from './app'

export const authProviders = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
} as const

export type AuthProviders = keyof typeof authProviders

export const signInWithProvider = (provider: AuthProviders) =>
  signInWithPopup(auth, authProviders[provider])

export const signInWithCredentials = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signUpWithCredentials = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const signOut = () => _signOut(auth)

export const sendPasswordResetEmail = (email: string) =>
  _sendPasswordResetEmail(auth, email)
