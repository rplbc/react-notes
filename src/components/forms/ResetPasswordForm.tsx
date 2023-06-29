import ResponseMessage from '@/components/ResponseMessage'
import { useLoadingContext } from '@/hooks'
import { sendPasswordResetEmail } from '@/lib/firebase/auth'
import { getAuthErrorMsg, pagePath } from '@/lib/utils'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/lib/validation'
import type { ResponseMsg } from '@/types'
import { Anchor, Button, Flex, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResetPasswordForm = () => {
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm<ResetPasswordSchema>({
    initialValues: { email: '' },
    validate: zodResolver(resetPasswordSchema),
  })

  const handleSubmit = form.onSubmit(async ({ email }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(email)
      form.reset()
      setRes({
        status: 'success',
        msg: 'Email sent',
      })
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
          description="Enter your email to get a reset link"
          placeholder="your@mail.com"
          inputMode="email"
          disabled={isLoading}
          withAsterisk
          {...form.getInputProps('email')}
        />

        {res && <ResponseMessage {...res} />}

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
