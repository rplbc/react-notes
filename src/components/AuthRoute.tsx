import { LoadingContext } from '@/contexts/Loading'
import { useAppSelector } from '@/store/hooks'
import { AUTH_AUTHORIZED_STATUS } from '@/store/slices/user'
import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthRoute = () => {
  const authStatus = useAppSelector((s) => s.user.status)
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  if (authStatus === AUTH_AUTHORIZED_STATUS)
    return <Navigate to={state?.from || '/'} replace />

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Outlet />
    </LoadingContext.Provider>
  )
}

export default AuthRoute
