import Page from '@/components/Page'
import { Button, Flex, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Page title="Page not found">
      <Flex
        align="center"
        justify="center"
        direction="column"
        mih="90dvh"
        gap="lg"
        py="xl"
      >
        <Title>Page not found</Title>
        <Button component={Link} to="/" replace>
          ← Go back to home page
        </Button>
      </Flex>
    </Page>
  )
}

export default NotFoundPage
