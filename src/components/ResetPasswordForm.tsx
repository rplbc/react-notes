import { useLoadingContext } from '@/contexts/Loading'
import { sendPasswordResetEmail } from '@/firebase/auth'
import { pagePath } from '@/routes'
import { Anchor, Button, Flex, Group, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const validationSchema = z.object({
  email: z.string().email(),
})

const initialValues: z.infer<typeof validationSchema> = {
  email: '',
}

const ResetPasswordForm = () => {
  const [error, setError] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const { isLoading, setIsLoading } = useLoadingContext()

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ email }) => {
    setError('')
    setResponseMessage('')
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(email)
      setResponseMessage('Password reset email sent')
      form.reset()
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
          description="Enter your email to get a reset link"
          placeholder="your@mail.com"
          inputMode="email"
          disabled={isLoading}
          withAsterisk
          {...form.getInputProps('email')}
        />

        {error && (
          <Text size="sm" color="red">
            {error}
          </Text>
        )}

        {responseMessage && (
          <Text size="sm" color="green">
            {responseMessage}
          </Text>
        )}

        <Group position="apart" mt="sm">
          <Anchor component={Link} to={pagePath.signIn} size="sm">
            ← Go back
          </Anchor>
          <Button type="submit" disabled={isLoading}>
            Reset password
          </Button>
        </Group>
      </Flex>
    </form>
  )
}

export default ResetPasswordForm
