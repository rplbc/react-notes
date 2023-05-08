import { createContext, useContext } from 'react'

type LoadingContextValues = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextValues | null>(null)

export const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext)

  if (!loadingContext) {
    throw new Error(
      'loadingContext has to be used within <LoadingContext.Provider>'
    )
  }

  return loadingContext
}
