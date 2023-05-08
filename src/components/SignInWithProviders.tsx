import { useLoadingContext } from '@/contexts/Loading'
import { signInWithProvider, type AuthProviders } from '@/firebase/auth'
import { Button, Flex, Text } from '@mantine/core'
import { FirebaseError } from 'firebase/app'
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
        const res = await signInWithProvider(provider)
        console.log(res)
      } catch (err) {
        console.log(err)
        setError(
          err instanceof FirebaseError ? err.message : 'Something went wrong'
        )
      }

      setIsLoading(false)
    },
    [setIsLoading]
  )

  return (
    <Flex direction="column" gap="xs">
      {providers.map(({ provider, label }) => (
        <Button
          key={label}
          variant="outline"
          onClick={() => signIn(provider)}
          disabled={isLoading}
        >
          {label}
        </Button>
      ))}
      {error && (
        <Text size="sm" color="red">
          {error}
        </Text>
      )}
    </Flex>
  )
}

export default SignInWithProviders
