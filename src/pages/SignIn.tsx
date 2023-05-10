import Page from '@/components/Page'
import SignInForm from '@/components/SignInForm'
import SignInWithProviders, {
  type SignInWithProvidersProps,
} from '@/components/SignInWithProviders'
import SingleFormWrapper from '@/components/SingleFormWrapper'
import { pagePath } from '@/routes'
import { Anchor, Divider, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const providers: SignInWithProvidersProps['providers'] = [
  {
    provider: 'google',
    label: 'Google',
  },
  {
    provider: 'github',
    label: 'GitHub',
  },
]

const SignInPage = () => {
  return (
    <Page title="Sign in">
      <SingleFormWrapper title="Sign in">
        <SignInForm />
        <Divider label="Or sign in with" labelPosition="center" />
        <SignInWithProviders providers={providers} />
        <Text color="dimmed" size="sm" align="center">
          Do not have an account yet?{' '}
          <Anchor component={Link} to={pagePath.signUp}>
            Sign up
          </Anchor>
        </Text>
      </SingleFormWrapper>
    </Page>
  )
}

export default SignInPage
