import ResponseMessage from '@/components/ResponseMessage'
import { signInWithProvider, type AuthProviders } from '@/firebase/auth'
import { useLoadingContext } from '@/hooks'
import { getAuthErrorMsg, type ResponseMsg } from '@/utils'
import { Button, Flex } from '@mantine/core'
import { useCallback, useState } from 'react'

export type SignInWithProvidersProps = {
  providers: { provider: AuthProviders; label: string }[]
}

const SignInWithProviders = ({ providers }: SignInWithProvidersProps) => {
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)

  const signIn = useCallback(async (provider: AuthProviders) => {
    setRes(null)
    setIsLoading(true)

    try {
      await signInWithProvider(provider)
    } catch (err) {
      console.log(err)
      setRes({
        status: 'error',
        msg: getAuthErrorMsg(err),
      })
    }

    setIsLoading(false)
  }, [])

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

      {res && <ResponseMessage {...res} />}
    </Flex>
  )
}

export default SignInWithProviders
