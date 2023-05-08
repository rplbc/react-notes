import Page from '@/components/Page'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import SingleFormWrapper from '@/components/SingleFormWrapper'

const ResetPasswordPage = () => {
  return (
    <Page title="Forgot password?">
      <SingleFormWrapper title="Reset password">
        <ResetPasswordForm />
      </SingleFormWrapper>
    </Page>
  )
}

export default ResetPasswordPage
