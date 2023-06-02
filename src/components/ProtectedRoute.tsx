import AppHeader from '@/components/AppHeader'
import { LoadingContext } from '@/contexts'
import { useAuthStatus } from '@/hooks'
import { Container } from '@mantine/core'
import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthorized } = useAuthStatus()
  const [isLoading, setIsLoading] = useState(false)
  const { pathname } = useLocation()

  if (!isAuthorized)
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
