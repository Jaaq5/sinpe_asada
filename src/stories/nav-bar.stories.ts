// src/stories/NavBar.stories.ts

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import NavBar from "@/components/nav-bar"; // Ajusta la ruta según tu estructura

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // Opcional: para un diseño de pantalla completa en Storybook
  },
  args: {
    onLogin: fn(), // Funciones mock para probar
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: undefined, // Puedes definir un usuario aquí si es necesario para la historia predeterminada
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: undefined, // Usuario no definido para la historia de "LoggedOut"
  },
};
