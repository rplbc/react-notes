import { LoadingContext } from '@/contexts'
import { useAuthStatus } from '@/hooks'
import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthRoute = () => {
  const { isAuthorized } = useAuthStatus()
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthorized) return <Navigate to={state?.from || '/'} replace />

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Outlet />
    </LoadingContext.Provider>
  )
}

export default AuthRoute
