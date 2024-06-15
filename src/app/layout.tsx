import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sinpe - Asada",
  description: "Web para el control de pagos por SINPE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <header>
          <Header />
        </header>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
