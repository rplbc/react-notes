import AddNoteForm from '@/components/AddNoteForm'
import NoteCard from '@/components/NoteCard'
import Page from '@/components/Page'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getNotes } from '@/store/slices/notes'
import { Divider, Group, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'

const AllNotesPage = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((s) => s.notes.items)
  const [search, setSearch] = useState('')
  const [debounced] = useDebouncedValue(search, 200)
  const filteredNotes = useMemo(
    () =>
      notes.filter(({ title }) =>
        title.toLowerCase().includes(debounced.toLowerCase())
      ),
    [debounced, notes]
  )

  useEffect(() => {
    const promise = dispatch(getNotes())
    return () => promise.abort()
  }, [dispatch])

  return (
    <Page title="All notes">
      <Group align="center" mb={20}>
        <Title mr="auto">All notes ({notes.length})</Title>
        <TextInput
          type="search"
          placeholder="Search by title"
          icon={<IconSearch size="1rem" />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          disabled={notes.length === 0}
        />
        <AddNoteForm />
      </Group>
      <Divider mt={20} mb={30} />
      <SimpleGrid
        spacing={20}
        cols={3}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {filteredNotes.map(({ id, title }) => (
          <NoteCard key={id} id={id} title={title} />
        ))}
      </SimpleGrid>
    </Page>
  )
}

export default AllNotesPage
