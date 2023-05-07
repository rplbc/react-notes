import { signUpWithCredentials } from '@/firebase/auth'
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { z } from 'zod'

const validationSchema = z
  .object({
    displayName: z.string().nonempty('Required'),
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
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [error, setError] = useState('')
  const [isPasswordVisible, { toggle: toggleIsPasswordVisible }] =
    useDisclosure(false)

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setError('')

    try {
      const res = await signUpWithCredentials(email, password)
      console.log(res)
    } catch (err) {
      console.log(err)
      setError(
        err instanceof FirebaseError ? err.message : 'Something went wrong'
      )
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="xs">
        <TextInput
          label="Display name"
          placeholder="E.g. your full name"
          withAsterisk
          {...form.getInputProps('displayName')}
        />

        <TextInput
          label="Email"
          placeholder="your@mail.com"
          inputMode="email"
          withAsterisk
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          visible={isPasswordVisible}
          onVisibilityChange={toggleIsPasswordVisible}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          withAsterisk
          visible={isPasswordVisible}
          onVisibilityChange={toggleIsPasswordVisible}
          {...form.getInputProps('confirmPassword')}
        />

        {error && (
          <Text size="sm" color="red">
            {error}
          </Text>
        )}

        <Button type="submit" mt="sm">
          Sign up
        </Button>
      </Flex>
    </form>
  )
}

export default SignUpForm
