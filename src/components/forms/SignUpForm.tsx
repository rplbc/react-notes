import ResponseMessage from '@/components/ResponseMessage'
import { useLoadingContext } from '@/hooks'
import { signUpWithCredentials } from '@/lib/firebase/auth'
import { getAuthErrorMsg } from '@/lib/utils'
import { signUpSchema, type SignUpSchema } from '@/lib/validation'
import type { ResponseMsg } from '@/types'
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

const SignUpForm = () => {
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)
  const [isPasswordVisible, { toggle: toggleIsPasswordVisible }] =
    useDisclosure(false)

  const form = useForm<SignUpSchema>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(signUpSchema),
  })

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await signUpWithCredentials(email, password)
    } catch (err) {
      console.log(err)
      setRes({
        status: 'error',
        msg: getAuthErrorMsg(err),
      })
    }

    setIsLoading(false)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="xs">
        <TextInput
          label="Email"
          placeholder="your@mail.com"
          inputMode="email"
          withAsterisk
          disabled={isLoading}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          visible={isPasswordVisible}
          onVisibilityChange={toggleIsPasswordVisible}
          disabled={isLoading}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          withAsterisk
          visible={isPasswordVisible}
          onVisibilityChange={toggleIsPasswordVisible}
          disabled={isLoading}
          {...form.getInputProps('confirmPassword')}
        />

        {res && <ResponseMessage {...res} />}

        <Button type="submit" mt="sm" disabled={isLoading}>
          Sign up
        </Button>
      </Flex>
    </form>
  )
}

export default SignUpForm
