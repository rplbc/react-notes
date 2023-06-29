import { useAppDispatch, useAuthStatus } from '@/hooks'
import { auth } from '@/lib/firebase'
import { setUser } from '@/store/slices/user'
import { LoadingOverlay } from '@mantine/core'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const RootRoute = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAuthStatus()

  useEffect(() => {
    const unsubAuthState = onAuthStateChanged(auth, (user) => {
      if (user === null) return dispatch(setUser(null))

      const { uid, email, displayName, photoURL } = user
      dispatch(setUser({ uid, email, displayName, photoURL }))
    })

    return () => unsubAuthState()
  }, [dispatch])

  if (isLoading) return <LoadingOverlay visible />

  return <Outlet />
}

export default RootRoute
