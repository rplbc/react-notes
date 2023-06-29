import ResponseMessage from '@/components/ResponseMessage'
import { useAppDispatch, useAppSelector, useLoadingContext } from '@/hooks'
import { updateDisplayName } from '@/store/slices/user'
import type { ResponseMsg } from '@/types'
import { Button, Flex, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { z } from 'zod'

const validationSchema = z.object({
  displayName: z.string().max(30, 'Max 30 characters'),
})

type ProfileFormValues = z.infer<typeof validationSchema>

const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const { displayName, email } = useAppSelector((s) => s.user)
  const { isLoading, setIsLoading } = useLoadingContext()

  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm<ProfileFormValues>({
    initialValues: {
      displayName: displayName || '',
    },
    validate: zodResolver(validationSchema),
  })

  const handleSubmit = form.onSubmit(async ({ displayName }) => {
    setRes(null)
    setIsLoading(true)

    try {
      await dispatch(updateDisplayName(displayName.trim())).unwrap()
      setRes({
        status: 'success',
        msg: 'Saved',
      })
    } catch (err) {
      console.log(err)
      setRes({
        status: 'error',
        msg: 'Something went wrong, please try again',
      })
    }

    setIsLoading(false)
  })

  return (
    <form onSubmit={handleSubmit} onFocus={() => setRes(null)}>
      <Flex direction="column" gap="xs">
        <TextInput label="Email" defaultValue={email || ''} readOnly disabled />
        <TextInput
          label="Display name"
          placeholder="Your display name"
          disabled={isLoading}
          {...form.getInputProps('displayName')}
        />
        {res && <ResponseMessage {...res} />}
        <Group mt="sm">
          <Button
            type="submit"
            disabled={isLoading || displayName === form.values.displayName}
          >
            Save
          </Button>
        </Group>
      </Flex>
    </form>
  )
}

export default ProfileForm
