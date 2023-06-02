import { createContext } from 'react'

type LoadingContextValues = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext<LoadingContextValues | null>(null)

export default LoadingContext
