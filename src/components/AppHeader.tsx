import { signOut } from '@/firebase/auth'
import { pagePath } from '@/routes'
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
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons-react'
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
        <Menu width={240} position="bottom-end" withinPortal withArrow>
          <Menu.Target>
            <UnstyledButton>
              <Group spacing="xs">
                <Avatar
                  src={user.photoURL}
                  color="indigo"
                  variant="filled"
                  radius="xl"
                  size={36}
                />
                <div>
                  <Text fw="600" size="sm" lh="1">
                    {user.displayName}
                  </Text>
                  <Text color="dimmed" size="xs" lh="1">
                    {user.email}
                  </Text>
                </div>
                <IconChevronDown size="1rem" stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              to={pagePath.profile}
              icon={<IconUser size="1rem" />}
            >
              Profile
            </Menu.Item>
            <Menu.Item onClick={signOut} icon={<IconLogout size="1rem" />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Header>
  )
}

export default AppHeader