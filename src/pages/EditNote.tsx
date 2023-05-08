import Page from '@/components/Page'
import { useParams } from 'react-router-dom'

const EditNotePage = () => {
  const { id } = useParams()

  if (!id)
    return (
      <Page title={`Note ${id} not found`}>
        <h1>Note {id} not found</h1>
      </Page>
    )

  return (
    <Page title={`Note ${id}`}>
      <h1>Note {id}</h1>
    </Page>
  )
}

export default EditNotePage
