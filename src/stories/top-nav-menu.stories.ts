// src/stories/TopNavMenu.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import TopNavMenu from "@/components/top-nav-menu"; // Ajusta la ruta según tu estructura

const meta: Meta<typeof TopNavMenu> = {
  title: "Components/TopNavMenu",
  component: TopNavMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // Opcional: para un diseño de pantalla completa en Storybook
  },
  argTypes: {
    text1: { control: "text", defaultValue: "Consultar recibo" },
    text2: { control: "text", defaultValue: "Trámites" },
    text3: { control: "text", defaultValue: "Contacto" },
    backgroundColor: { control: "color", defaultValue: "#501450" },
    textColor: { control: "color", defaultValue: "#007bff" },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavMenu>;

export const Default: Story = {
  args: {},
};
