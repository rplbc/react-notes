import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateDisplayName } from '@/store/slices/user'
import { Button, Flex, Group, Text, TextInput } from '@mantine/core'
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

  const [isLoading, setIsLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [error, setError] = useState('')

  const form = useForm<ProfileFormValues>({
    initialValues: {
      displayName: displayName || '',
    },
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  })

  const handleSubmit = form.onSubmit(async ({ displayName }) => {
    setIsLoading(true)
    setError('')
    setResponseMessage('')

    try {
      await dispatch(updateDisplayName(displayName.trim())).unwrap()
      setResponseMessage('Saved')
    } catch (err) {
      console.log(err)
      setError('Something went wrong, please try again')
    }

    setIsLoading(false)
  })

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={() => {
        setError('')
        setResponseMessage('')
      }}
    >
      <Flex direction="column" gap="xs">
        <TextInput label="Email" defaultValue={email || ''} readOnly disabled />
        <TextInput
          label="Display name"
          placeholder="Your display name"
          disabled={isLoading}
          {...form.getInputProps('displayName')}
        />
        {error && (
          <Text size="sm" color="red">
            {error}
          </Text>
        )}
        {responseMessage && (
          <Text size="sm" color="green">
            {responseMessage}
          </Text>
        )}
        <Group mt="sm">
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </Group>
      </Flex>
    </form>
  )
}

export default ProfileForm
