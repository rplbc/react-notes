import type { RootState } from '@/store'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
