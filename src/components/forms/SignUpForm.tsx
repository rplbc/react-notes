import ResponseMessage from '@/components/ResponseMessage'
import { useLoadingContext } from '@/hooks'
import { signUpWithCredentials } from '@/lib/firebase/auth'
import type { ResponseMsg } from '@/types'
import { getAuthErrorMsg } from '@/utils'
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { z } from 'zod'

const validationSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .nonempty('Required')
      .min(6, 'Password should be at least 6 characters'),
    confirmPassword: z.string().nonempty('Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const initialValues: z.infer<typeof validationSchema> = {
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)
  const [isPasswordVisible, { toggle: toggleIsPasswordVisible }] =
    useDisclosure(false)

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
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
