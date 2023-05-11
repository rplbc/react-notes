import NoteEditor from '@/components/NoteEditor'
import Page from '@/components/Page'
import { useAppSelector } from '@/store/hooks'
import { pagePath } from '@/utils'
import { Anchor, Button, Title } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'

const EditNotePage = () => {
  const { id } = useParams()
  const note = useAppSelector((s) =>
    s.notes.find(({ id: noteId }) => id === noteId)
  )

  if (!note)
    return (
      <Page title={`Note not found`}>
        <Title mb={30}>Note not found</Title>
        <Button component={Link} to="/" replace>
          ← Go back to home page
        </Button>
      </Page>
    )

  const { title } = note

  return (
    <Page title={title}>
      <Anchor component={Link} to={pagePath.home}>
        ← Go back
      </Anchor>
      <Title mt={20} mb={30}>
        {title}
      </Title>
      <NoteEditor {...note} />
    </Page>
  )
}

export default EditNotePage
