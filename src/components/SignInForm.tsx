import ResponseMessage from '@/components/ResponseMessage'
import { useLoadingContext } from '@/contexts/Loading'
import { signInWithCredentials } from '@/firebase/auth'
import { getAuthErrorMsg, pagePath, type ResponseMsg } from '@/utils'
import {
  Anchor,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
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
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm({
    initialValues,
    validate: zodResolver(validationSchema),
  })

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await signInWithCredentials(email, password)
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

        {res && <ResponseMessage {...res} />}

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
