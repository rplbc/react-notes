import { auth } from '@/firebase'
import { updateProfile } from 'firebase/auth'

export const setDisplayName = (displayName: string | null) => {
  if (!auth.currentUser) throw new Error('Unauthorized')
  return updateProfile(auth.currentUser, { displayName })
}
