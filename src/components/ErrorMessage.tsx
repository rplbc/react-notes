import { Text, type TextProps } from '@mantine/core'

const ErrorMessage = ({ children, ...props }: TextProps) => {
  if (!children) return null

  return (
    <Text size="sm" color="red" {...props}>
      {children}
    </Text>
  )
}

export default ErrorMessage
