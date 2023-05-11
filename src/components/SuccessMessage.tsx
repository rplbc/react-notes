import { Text, type TextProps } from '@mantine/core'

const SuccessMessage = ({ children, ...props }: TextProps) => {
  if (!children) return null

  return (
    <Text size="sm" color="green" {...props}>
      {children}
    </Text>
  )
}

export default SuccessMessage
