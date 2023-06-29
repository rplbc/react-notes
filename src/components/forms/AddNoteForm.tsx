import ResponseMessage from '@/components/ResponseMessage'
import { useAppDispatch, useLoadingContext } from '@/hooks'
import { addNoteScheme, type AddNoteScheme } from '@/lib/validation'
import { addNote } from '@/store/slices/notes'
import type { ResponseMsg } from '@/types'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

const AddNoteForm = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const dispatch = useAppDispatch()
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm<AddNoteScheme>({
    initialValues: {
      title: '',
    },
    validate: zodResolver(addNoteScheme),
  })

  const handleSubmit = form.onSubmit(async ({ title }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await dispatch(addNote({ title, content: '' })).unwrap()
      form.reset()
      close()
    } catch (err) {
      console.log(err)
      setRes({ status: 'error', msg: 'Something went wrong, please try again' })
    }

    setIsLoading(false)
  })

  return (
    <>
      <Modal
        opened={opened || isLoading}
        onClose={close}
        title="Add new note"
        onBlur={() => setRes(null)}
        closeOnClickOutside={!isLoading}
        withCloseButton={false}
        centered
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            data-autofocus
            label="Title"
            placeholder="Note title"
            disabled={isLoading}
            {...form.getInputProps('title')}
          />
          {res && <ResponseMessage {...res} />}
          <Group position="right" mt={20}>
            <Button variant="white" onClick={close} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <Button onClick={open} leftIcon={<IconPlus size="1rem" />}>
        Add new note
      </Button>
    </>
  )
}

export default AddNoteForm
