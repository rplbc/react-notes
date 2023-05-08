import { signOut } from '@/firebase/auth'
import { useAppSelector } from '@/store/hooks'
import {
  Anchor,
  Avatar,
  Group,
  Header,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  const user = useAppSelector((s) => s.user)

  return (
    <Header
      sx={(theme) => ({ background: theme.colors.gray[0] })}
      height={80}
      px={20}
    >
      <Group position="apart" h="100%">
        <Anchor component={Link} to="/" size="xl" fw="700" unstyled>
          Notes
        </Anchor>
        <Menu width={180} position="bottom-end" withinPortal withArrow>
          <Menu.Target>
            <UnstyledButton>
              <Group spacing="xs">
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || undefined}
                  radius="xl"
                  size={40}
                />
                <div>
                  <Text fw="600" size="sm" lh="1">
                    {user.displayName}
                  </Text>
                  <Text color="dimmed" size="xs" lh="1">
                    {user.email}
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={signOut}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Header>
  )
}

export default AppHeader
