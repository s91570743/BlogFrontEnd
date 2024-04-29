import classes from "../assets/css/navbar.module.css";
import {
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Box,
  rem,
  useMantineTheme,
  Container,
  TextInput,
  Space,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconSearch,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

function Navbar({ token }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Container size="xl">
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link to ="/" className={classes.linkText}><h1>Blog</h1></Link>

            {token ? (
              <Avatar src={avatar} alt="image" size="md"></Avatar>
            ) : (
              <Group>
                <Link to="/login">
                  <Button variant="filled">Log in</Button>
                </Link>
              </Group>
            )}
          </Group>
          <TextInput
            radius="xl"
            placeholder="Search..."
            className={classes.searchInput}
            leftSectionPointerEvents="none"
            leftSection={
              <IconSearch style={{ width: rem(16), height: rem(16) }} />
            }
          />
        </header>
      </Box>
    </Container>
  );
}

export default Navbar;
