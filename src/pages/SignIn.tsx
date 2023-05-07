import Page from '@/components/Page'
import SignInForm from '@/components/SignInForm'
import SignInWithProviders, {
  type SignInWithProvidersProps,
} from '@/components/SignInWithProviders'
import { pagePath } from '@/router'
import {
  Anchor,
  Center,
  Divider,
  Flex,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const providers: SignInWithProvidersProps['providers'] = [
  {
    provider: 'google',
    label: 'Continue with Google',
  },
  {
    provider: 'github',
    label: 'Continue with GitHub',
  },
]

const SignInPage = () => {
  return (
    <Page title="Sign in">
      <Center pos="relative" mih="100dvh" p="lg">
        <Paper w={420} maw="100%" m="auto" p="lg" withBorder>
          <Flex direction="column" gap="lg">
            <Title align="center">Sign in</Title>
            <SignInForm />
            <Divider label="Or" labelPosition="center" />
            <SignInWithProviders providers={providers} />
            <Text color="dimmed" size="sm" align="center">
              Do not have an account yet?{' '}
              <Anchor component={Link} to={pagePath.signUp}>
                Sign up
              </Anchor>
            </Text>
          </Flex>
        </Paper>
      </Center>
    </Page>
  )
}

export default SignInPage
