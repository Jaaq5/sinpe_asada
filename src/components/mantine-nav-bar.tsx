// Based on https://ui.mantine.dev/category/headers/
"use client";
import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/headers-tabs.module.css";
import Image from "next/image"; // Import next/image
import Link from "next/link";

const user = {
  name: "Admin",
  email: "janspoon@fighter.dev",
  image: "",
};

const tabs = [
  { label: "Inicio", link: "/" },
  { label: "Sinpe", link: "/sinpe" },
  { label: "Próximamente", link: "/" },
];

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.label} key={tab.label}>
      <Link href={tab.link}>{tab.label}</Link>
    </Tabs.Tab>
  ));

  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      const selectedTab = tabs.find((tab) => tab.label === value);
      if (selectedTab) {
        window.location.href = selectedTab.link;
      }
    }
  };

  return (
    <div className={classes.header}>
      <Container size="md" className=" flex place-items-baseline">
        <div className={classes.logoContainer}>
          {/* Crear un contenedor para el logo */}
          <Image
            src="/asada-logo-dark-2.webp"
            alt="Logo"
            className={classes.logo}
            width={150} // Ajusta según tus necesidades
            height={70} // Ajusta según tus necesidades
          />
        </div>
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
          //onChange={handleTabChange}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
        {/* User menu */}
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">
            {/*
          <MantineLogo size={28} />
          */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Post con me gusta
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Post guardados
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Comentarios
                </Menu.Item>

                <Menu.Label>Ajustes</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Configuración de cuenta
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Cambiar cuenta
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Cerrar sesion
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Zona de peligro</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconPlayerPause
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Pausar suscripción
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Borrar cuenta
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </Container>
    </div>
  );
}
