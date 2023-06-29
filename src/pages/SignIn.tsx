import Page from '@/components/Page'
import SignInForm from '@/components/forms/SignInForm'
import SignInWithProviders from '@/components/forms/SignInWithProviders'
import SingleFormWrapper from '@/components/layouts/SingleFormWrapper'
import { providers } from '@/lib/firebase/providers'
import { pagePath } from '@/utils'
import { Anchor, Divider, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const SignInPage = () => {
  return (
    <Page title="Sign in">
      <SingleFormWrapper title="Sign in">
        <SignInForm />
        <Divider label="Or sign in with" labelPosition="center" />
        <SignInWithProviders providers={providers} />
        <Text color="dimmed" size="sm" align="center">
          Don't have an account yet?{' '}
          <Anchor component={Link} to={pagePath.signUp}>
            Sign up
          </Anchor>
        </Text>
      </SingleFormWrapper>
    </Page>
  )
}

export default SignInPage
