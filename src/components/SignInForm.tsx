import { useLoadingContext } from '@/contexts/Loading'
import { signInWithCredentials } from '@/firebase/auth'
import { pagePath } from '@/routes'
import {
  Anchor,
  Button,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty('Required'),
})

const initialValues: z.infer<typeof validationSchema> = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [error, setError] = useState('')
  const { isLoading, setIsLoading } = useLoadingContext()

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setError('')
    setIsLoading(true)

    try {
      const res = await signInWithCredentials(email, password)
      console.log(res)
    } catch (err) {
      console.log(err)
      setError(
        err instanceof FirebaseError ? err.message : 'Something went wrong'
      )
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
          disabled={isLoading}
          withAsterisk
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          disabled={isLoading}
          withAsterisk
          {...form.getInputProps('password')}
        />

        {error && (
          <Text size="sm" color="red">
            {error}
          </Text>
        )}

        <Group position="apart" mt="sm">
          <Anchor component={Link} to={pagePath.resetPassword} size="sm">
            Forgot password?
          </Anchor>
          <Button type="submit" disabled={isLoading}>
            Sign in
          </Button>
        </Group>
      </Flex>
    </form>
  )
}

export default SignInForm
