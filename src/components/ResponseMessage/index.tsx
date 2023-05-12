import { type ResponseMsg } from '@/utils'
import { type TextProps } from '@mantine/core'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

type ResponseMsgOwnProps = ResponseMsg
type ResponseMsgProps = ResponseMsgOwnProps &
  Omit<TextProps, keyof ResponseMsgOwnProps>

const messageComponents: Record<
  ResponseMsgOwnProps['status'],
  React.ElementType
> = {
  success: SuccessMessage,
  error: ErrorMessage,
}

const ResponseMessage = ({
  msg,
  status = 'success',
  ...props
}: ResponseMsgProps) => {
  const Component = messageComponents[status]

  return <Component {...props}>{msg}</Component>
}

export default ResponseMessage
