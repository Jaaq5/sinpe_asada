import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "../components/header";
import { Footer } from "../components/mantine-footer";
import { roboto, eduQldBeginner, monserrat } from "../lib/fonts";

export const metadata: Metadata = {
  title: "Asada - Dulce Nombre de Naranjo",
  description: "Pagina web de la asada de Dulce Nombre de Naranjo",
  creator: "@jaaq5",
  metadataBase: new URL("https://sinpe-asada.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: ["Asada", "Dulce Nombre", "Sinpe"],

  /*Facebook*/
  openGraph: {
    title: "Asada - Dulce Nombre de Naranjo",
    description: "Pagina web de la asada de Dulce Nombre de Naranjo",
    siteName: "Asada - Dulce Nombre de Naranjo",
    url: "https://sinpe-asada.vercel.app",
    countryName: "Costa Rica",
    locale: "es_CR",
    type: "website",
    images: "/open-graph-image.webp",
  },

  /*Twitter*/
  twitter: {
    title: "Asada - Dulce Nombre de Naranjo",
    description: "Pagina web de la asada de Dulce Nombre de Naranjo",
    creator: "@jaaq5",
    site: "@sinpe-asada.vercel.app",
    card: "summary_large_image",
    images: "/open-graph-image.webp",
  },
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
      <body className={monserrat.className}>
        <MantineProvider defaultColorScheme="dark">
          <Notifications />
          <header>
            <Header />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}
