import Page from '@/components/Page'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import SingleFormPage from '@/components/SingleFormPage'

const ResetPasswordPage = () => {
  return (
    <Page title="Forgot password?">
      <SingleFormPage title="Reset password">
        <ResetPasswordForm />
      </SingleFormPage>
    </Page>
  )
}

export default ResetPasswordPage
