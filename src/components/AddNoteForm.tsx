import ResponseMessage from '@/components/ResponseMessage'
import { useLoadingContext } from '@/contexts/Loading'
import { useAppDispatch } from '@/store/hooks'
import { addNote } from '@/store/slices/notes'
import { type ResponseMsg } from '@/utils'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { z } from 'zod'

const validationSchema = z.object({
  title: z.string().min(3, 'Min 3 characters').max(30, 'Max 30 characters'),
})

type NewNoteFormValues = z.infer<typeof validationSchema>

const AddNoteForm = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const dispatch = useAppDispatch()
  const { isLoading, setIsLoading } = useLoadingContext()
  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm<NewNoteFormValues>({
    initialValues: {
      title: '',
    },
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ title }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await dispatch(addNote({ title, content: '' })).unwrap()
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
