// *IMPORTS ####################################################################
import type { Metadata } from "next";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import Header from "../components/header";
import { Footer } from "../components/mantine-footer";
import { roboto, monserrat } from "../lib/fonts";

// *METADATA ###################################################################
export const metadata: Metadata = {
  /* Html */
  title: "Asada - Dulce Nombre de Naranjo",
  description: "Página web de la Asada de Dulce Nombre de Naranjo.",
  creator: "@jaaq5",
  metadataBase: new URL("https://sinpe-asada.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: ["Asada", "Dulce Nombre", "Sinpe"],

  /* Facebook */
  openGraph: {
    title: "Asada - Dulce Nombre de Naranjo",
    description: "Página web de la Asada de Dulce Nombre de Naranjo.",
    siteName: "Asada - Dulce Nombre de Naranjo",
    url: "https://sinpe-asada.vercel.app",
    countryName: "Costa Rica",
    locale: "es_CR",
    type: "website",
    images: "./opengraph-image.png",
  },

  /* Twitter */
  twitter: {
    title: "Asada - Dulce Nombre de Naranjo",
    description: "Página web de la Asada de Dulce Nombre de Naranjo.",
    creator: "@jaaq5",
    site: "@sinpe-asada.vercel.app",
    card: "summary_large_image",
    images: "./twitter-image.png",
  },
};
//##############################################################################

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
