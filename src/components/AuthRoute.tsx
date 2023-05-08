import { useAppSelector } from '@/store/hooks'
import { AUTH_AUTHORIZED_STATUS } from '@/store/slices/user'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthRoute = () => {
  const authStatus = useAppSelector((s) => s.user.status)
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  if (authStatus === AUTH_AUTHORIZED_STATUS)
    return <Navigate to={from} replace />

  return <Outlet />
}

export default AuthRoute
