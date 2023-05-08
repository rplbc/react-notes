import Page from '@/components/Page'
import SignInForm from '@/components/SignInForm'
import SignInWithProviders, {
  type SignInWithProvidersProps,
} from '@/components/SignInWithProviders'
import SingleFormPage from '@/components/SingleFormPage'
import { pagePath } from '@/router'
import { Anchor, Divider, Text } from '@mantine/core'
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
      <SingleFormPage title="Sign in">
        <SignInForm />
        <Divider label="Or" labelPosition="center" />
        <SignInWithProviders providers={providers} />
        <Text color="dimmed" size="sm" align="center">
          Do not have an account yet?{' '}
          <Anchor component={Link} to={pagePath.signUp}>
            Sign up
          </Anchor>
        </Text>
      </SingleFormPage>
    </Page>
  )
}

export default SignInPage
