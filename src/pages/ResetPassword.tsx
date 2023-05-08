import Page from '@/components/Page'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import { Center, Flex, Paper, Title } from '@mantine/core'

const ResetPasswordPage = () => {
  return (
    <Page title="Forgot password?">
      <Center pos="relative" mih="100dvh" p="lg">
        <Paper w={420} maw="100%" m="auto" p="lg" withBorder>
          <Flex direction="column" gap="lg">
            <Title align="center">Reset password</Title>
            <ResetPasswordForm />
          </Flex>
        </Paper>
      </Center>
    </Page>
  )
}

export default ResetPasswordPage
