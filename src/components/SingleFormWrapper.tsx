import { Center, Flex, Paper, Title } from '@mantine/core'

type SingleFormWrapperProps = React.PropsWithChildren<{ title: string }>

const SingleFormWrapper = ({ children, title }: SingleFormWrapperProps) => {
  return (
    <Center pos="relative" mih="100dvh" p="lg">
      <Paper w={420} maw="100%" m="auto" p="lg" withBorder>
        <Flex direction="column" gap="lg">
          <Title align="center">{title}</Title>
          {children}
        </Flex>
      </Paper>
    </Center>
  )
}

export default SingleFormWrapper
