import ErrorMessage from '@/components/ErrorMessage'
import SuccessMessage from '@/components/SuccessMessage'
import { useLoadingContext } from '@/contexts/Loading'
import { sendPasswordResetEmail } from '@/firebase/auth'
import { pagePath } from '@/routes'
import { getAuthErrorMsg } from '@/utils'
import { Anchor, Button, Flex, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
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
      setError(getAuthErrorMsg(err))
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

        <ErrorMessage>{error}</ErrorMessage>
        <SuccessMessage>{responseMessage}</SuccessMessage>

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
