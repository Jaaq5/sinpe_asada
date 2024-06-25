// Based on https://ui.mantine.dev/category/footers/
"use client";
import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconDroplet,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/footer.module.css";

const links = [
  { link: "#", label: "Contacto" },
  { link: "#", label: "FAQ" },
  { link: "#", label: "Ubicacion" },
  { link: "#", label: "Pendiente1" },
  { link: "#", label: "Pendiente2" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {/*
        <MantineLogo size={28} />
        */}
        <IconDroplet size={28} />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandFacebook
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandWhatsapp
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
