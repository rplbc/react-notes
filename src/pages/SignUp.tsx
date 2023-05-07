import Page from '@/components/Page'
import SignUpForm from '@/components/SignUpForm'
import { pagePath } from '@/router'
import { Anchor, Center, Flex, Paper, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <Page title="Sign up">
      <Center pos="relative" mih="100dvh" p="lg">
        <Paper w={420} maw="100%" m="auto" p="lg" withBorder>
          <Flex direction="column" gap="lg">
            <Title align="center">Sign up</Title>
            <SignUpForm />
            <Text color="dimmed" size="sm" align="center">
              Already have an account?{' '}
              <Anchor component={Link} to={pagePath.signIn}>
                Sign in
              </Anchor>
            </Text>
          </Flex>
        </Paper>
      </Center>
    </Page>
  )
}

export default SignUpPage
