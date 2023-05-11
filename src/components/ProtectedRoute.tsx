import AppHeader from '@/components/AppHeader'
import { LoadingContext } from '@/contexts/Loading'
import { useAppSelector } from '@/store/hooks'
import { AUTH_AUTHORIZED_STATUS } from '@/store/slices/user'
import { Container } from '@mantine/core'
import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const authStatus = useAppSelector((s) => s.user.status)
  const [isLoading, setIsLoading] = useState(false)
  const { pathname } = useLocation()

  if (authStatus !== AUTH_AUTHORIZED_STATUS)
    return <Navigate to="/signin" state={{ from: pathname }} replace />

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AppHeader />
      <Container size="lg" py={60} px={20}>
        <Outlet />
      </Container>
    </LoadingContext.Provider>
  )
}

export default ProtectedRoute
