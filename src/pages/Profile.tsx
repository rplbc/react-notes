import Page from '@/components/Page'
import ProfileForm from '@/components/ProfileForm'
import { pagePath } from '@/routes'
import { Anchor, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <Page title="Profile">
      <Anchor component={Link} to={pagePath.home}>
        ← Go back
      </Anchor>
      <Title mt={20} mb={30}>
        Profile
      </Title>
      <ProfileForm />
    </Page>
  )
}

export default ProfilePage
