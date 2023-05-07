import { signInWithCredentials } from '@/firebase/auth'
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
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

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setError('')

    try {
      const res = await signInWithCredentials(email, password)
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
          label="Email"
          placeholder="your@mail.com"
          inputMode="email"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
        />

        {error && (
          <Text size="sm" color="red">
            {error}
          </Text>
        )}

        <Button type="submit" mt="sm">
          Sign in
        </Button>
      </Flex>
    </form>
  )
}

export default SignInForm
