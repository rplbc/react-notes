import { useAppSelector } from '@/store/hooks'
import { AUTH_AUTHORIZED_STATUS } from '@/store/slices/user'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const authStatus = useAppSelector((s) => s.user.status)
  const { pathname } = useLocation()

  if (authStatus !== AUTH_AUTHORIZED_STATUS)
    return <Navigate to="/signin" state={{ from: pathname }} replace />

  return <Outlet />
}

export default ProtectedRoute
