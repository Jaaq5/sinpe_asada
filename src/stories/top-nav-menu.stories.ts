import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TopNavMenu from "@/components/top-nav-menu";

const meta = {
  title: "Components/TopNavMenu",
  component: TopNavMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    invoiceLinkText: { control: "text", defaultValue: "Consultar recibo" },
    servicesLinkText: { control: "text", defaultValue: "Trámites" },
    sinpeLinkText: { control: "text", defaultValue: "Sinpe" },
    navBackgroundColor: { control: "color", defaultValue: "#142850" },
    linkTextColor: { control: "color", defaultValue: "#a0e9ff" },
    linkTextSize: { control: "text", defaultValue: "20px" },
  },
  args: {
    onInvoiceClick: fn(), // Utiliza fn() para registrar acciones
    onServicesClick: fn(),
    onSinpeClick: fn(),
  },
} satisfies Meta<typeof TopNavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Definición de historias con args
export const Default: Story = {
  args: {
    invoiceLinkText: "Consultar recibo",
    servicesLinkText: "Tramites",
    sinpeLinkText: "Sinpe",
    navBackgroundColor: "#142850",
    linkTextColor: "#a0e9ff",
    linkTextSize: "20px",
  },
};

export const Light: Story = {
  args: {
    invoiceLinkText: "Consultar recibo",
    servicesLinkText: "Tramites",
    sinpeLinkText: "Sinpe",
    navBackgroundColor: "#a0e9ff",
    linkTextColor: "#142850",
    linkTextSize: "20px",
  },
};
