import NoteEditor from '@/components/note/NoteEditor'
import Page from '@/components/Page'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getNote } from '@/store/slices/notes'
import { pagePath } from '@/utils'
import { Anchor, Button, LoadingOverlay, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EditNotePage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const note = useAppSelector((s) =>
    s.notes.items.find(({ id: noteId }) => id === noteId)
  )
  const [hasChecked, setHasChecked] = useState(!!note)

  useEffect(() => {
    const getInitialNote = async (id: string) => {
      try {
        await dispatch(getNote(id)).unwrap()
      } catch (err) {
        console.log(err)
      }

      setHasChecked(true)
    }

    if (id) getInitialNote(id)
    else setHasChecked(true)
  }, [id, dispatch])

  if (!hasChecked) return <LoadingOverlay visible />

  if (!note)
    return (
      <Page title={`Note not found`}>
        <Title mb={30}>Note not found</Title>
        <Button component={Link} to="/" replace>
          ← Go back to home page
        </Button>
      </Page>
    )

  return (
    <Page title={note.title}>
      <Anchor component={Link} to={pagePath.home}>
        ← Go back
      </Anchor>
      <Title mt={20} mb={30}>
        {note.title}
      </Title>
      <NoteEditor {...note} />
    </Page>
  )
}

export default EditNotePage
