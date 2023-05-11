import AppHeader from '@/components/AppHeader'
import { useAppSelector } from '@/store/hooks'
import { AUTH_AUTHORIZED_STATUS } from '@/store/slices/user'
import { Container } from '@mantine/core'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const authStatus = useAppSelector((s) => s.user.status)
  const { pathname } = useLocation()

  if (authStatus !== AUTH_AUTHORIZED_STATUS)
    return <Navigate to="/signin" state={{ from: pathname }} replace />

  return (
    <>
      <AppHeader />
      <Container size="lg" py={60} px={20}>
        <Outlet />
      </Container>
    </>
  )
}

export default ProtectedRoute
