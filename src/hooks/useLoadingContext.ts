import { LoadingContext } from '@/contexts'
import { useContext } from 'react'

const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext)

  if (!loadingContext) {
    throw new Error(
      'loadingContext has to be used within <LoadingContext.Provider>'
    )
  }

  return loadingContext
}

export default useLoadingContext
