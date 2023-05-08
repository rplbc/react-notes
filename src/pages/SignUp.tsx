import Page from '@/components/Page'
import SignUpForm from '@/components/SignUpForm'
import SingleFormPage from '@/components/SingleFormPage'
import { pagePath } from '@/router'
import { Anchor, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <Page title="Sign up">
      <SingleFormPage title="Sign up">
        <SignUpForm />
        <Text color="dimmed" size="sm" align="center">
          Already have an account?{' '}
          <Anchor component={Link} to={pagePath.signIn}>
            Sign in
          </Anchor>
        </Text>
      </SingleFormPage>
    </Page>
  )
}

export default SignUpPage
