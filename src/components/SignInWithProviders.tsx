import ErrorMessage from '@/components/ErrorMessage'
import { useLoadingContext } from '@/contexts/Loading'
import { signInWithProvider, type AuthProviders } from '@/firebase/auth'
import { getAuthErrorMsg } from '@/utils'
import { Button, Flex } from '@mantine/core'
import { useCallback, useState } from 'react'

export type SignInWithProvidersProps = {
  providers: { provider: AuthProviders; label: string }[]
}

const SignInWithProviders = ({ providers }: SignInWithProvidersProps) => {
  const [error, setError] = useState('')
  const { isLoading, setIsLoading } = useLoadingContext()

  const signIn = useCallback(
    async (provider: AuthProviders) => {
      setError('')
      setIsLoading(true)

      try {
        await signInWithProvider(provider)
      } catch (err) {
        console.log(err)
        setError(getAuthErrorMsg(err))
      }

      setIsLoading(false)
    },
    [setIsLoading]
  )

  return (
    <Flex gap="xs" wrap="wrap">
      {providers.map(({ provider, label }) => (
        <Button
          key={label}
          sx={{ flex: '1 0 160px' }}
          variant="default"
          onClick={() => signIn(provider)}
          disabled={isLoading}
        >
          {label}
        </Button>
      ))}
      <ErrorMessage>{error}</ErrorMessage>
    </Flex>
  )
}

export default SignInWithProviders
