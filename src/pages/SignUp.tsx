import Page from '@/components/Page'
import SignUpForm from '@/components/forms/SignUpForm'
import SingleFormWrapper from '@/components/layouts/SingleFormWrapper'
import { pagePath } from '@/lib/utils'
import { Anchor, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <Page title="Sign up">
      <SingleFormWrapper title="Sign up">
        <SignUpForm />
        <Text color="dimmed" size="sm" align="center">
          Already have an account?{' '}
          <Anchor component={Link} to={pagePath.signIn}>
            Sign in
          </Anchor>
        </Text>
      </SingleFormWrapper>
    </Page>
  )
}

export default SignUpPage
