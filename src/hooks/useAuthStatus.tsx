import { useAppSelector } from '@/store/hooks'
import {
  AUTH_AUTHORIZED_STATUS,
  AUTH_LOADING_STATUS,
} from '@/store/slices/user'

const useAuthStatus = () => {
  const status = useAppSelector((s) => s.user.status)
  const isAuthorized = status === AUTH_AUTHORIZED_STATUS
  const isLoading = status === AUTH_LOADING_STATUS

  return { status, isAuthorized, isLoading }
}

export default useAuthStatus
