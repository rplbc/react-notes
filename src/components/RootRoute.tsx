import { auth } from '@/firebase'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AUTH_LOADING_STATUS, setUser } from '@/store/slices/user'
import { LoadingOverlay } from '@mantine/core'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const RootRoute = () => {
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((s) => s.user.status)

  useEffect(() => {
    const unsubAuthState = onAuthStateChanged(auth, (user) => {
      if (user === null) return dispatch(setUser(null))

      const { uid, email, displayName, photoURL } = user
      dispatch(setUser({ uid, email, displayName, photoURL }))
    })

    return () => unsubAuthState()
  }, [dispatch])

  if (authStatus === AUTH_LOADING_STATUS) return <LoadingOverlay visible />

  return <Outlet />
}

export default RootRoute
