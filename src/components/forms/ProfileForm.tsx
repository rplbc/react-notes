import ResponseMessage from '@/components/ResponseMessage'
import { useAppDispatch, useAppSelector, useLoadingContext } from '@/hooks'
import { updateProfileScheme, type UpdateProfileScheme } from '@/lib/validation'
import { updateDisplayName } from '@/store/slices/user'
import type { ResponseMsg } from '@/types'
import { Button, Flex, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'

const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const { displayName, email } = useAppSelector((s) => s.user)
  const { isLoading, setIsLoading } = useLoadingContext()

  const [res, setRes] = useState<ResponseMsg | null>(null)

  const form = useForm<UpdateProfileScheme>({
    initialValues: {
      displayName: displayName || '',
    },
    validate: zodResolver(updateProfileScheme),
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
