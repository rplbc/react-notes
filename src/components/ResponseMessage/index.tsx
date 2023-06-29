import type { ResponseMsg } from '@/types'
import { type TextProps } from '@mantine/core'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

type ResponseMsgProps = ResponseMsg & Omit<TextProps, keyof ResponseMsg>

const messageComponents: Record<ResponseMsg['status'], React.ElementType> = {
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
