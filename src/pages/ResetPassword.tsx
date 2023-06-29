import Page from '@/components/Page'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import SingleFormWrapper from '@/components/layouts/SingleFormWrapper'

const ResetPasswordPage = () => {
  return (
    <Page title="Reset password">
      <SingleFormWrapper title="Reset password">
        <ResetPasswordForm />
      </SingleFormWrapper>
    </Page>
  )
}

export default ResetPasswordPage
