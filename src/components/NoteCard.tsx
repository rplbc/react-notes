import { useAppDispatch } from '@/hooks'
import { deleteNote } from '@/store/slices/notes'
import { pagePath } from '@/utils'
import { ActionIcon, Anchor, Card, Flex, Group, Title } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NoteCard = ({ id, title }: { id: string; title: string }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <Card radius="md" p="md" withBorder>
      <Flex direction="column" gap={20} h="100%">
        <Group>
          <Title order={3} size="h4" mr="auto">
            <Anchor component={Link} to={pagePath.note(id)} unstyled>
              {title}
            </Anchor>
          </Title>
          <ActionIcon
            component={Link}
            to={pagePath.note(id)}
            color="blue"
            variant="filled"
            disabled={isDeleting}
          >
            <IconEdit size="1rem" />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="light"
            disabled={isDeleting}
            onClick={async () => {
              setIsDeleting(true)
              try {
                await dispatch(deleteNote(id)).unwrap()
              } catch (err) {
                console.log(err)
              }
              setIsDeleting(false)
            }}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  )
}

export default NoteCard
