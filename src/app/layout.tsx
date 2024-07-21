// *IMPORTS ####################################################################
import type { Metadata } from "next";

import { createTheme, ColorSchemeScript, MantineProvider } from "@mantine/core";
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

const customLightTheme = createTheme({
  black: "#142850",
  white: "#A0E9FF",
  focusRing: "auto", // Specify the desired focus ring behavior
  scale: 1, // Specify the scale if needed
  fontSmoothing: true, // Specify font smoothing preference
  colors: {}, // You can define additional colors if required
  primaryShade: { light: 6, dark: 8 }, // Specify primary shade for light and dark themes
  primaryColor: "blue", // Specify the primary color key
  autoContrast: false, // Specify auto contrast preference
  luminanceThreshold: 0.3, // Specify luminance threshold
  fontFamily: "system-ui", // Specify the main font family
  fontFamilyMonospace: "monospace", // Specify monospace font family
  headings: {
    fontFamily: "system-ui", // Specify font family for headings
    fontWeight: "normal", // Specify font weight for headings
    textWrap: "wrap", // Specify text wrap behavior for headings
  },
  radius: {}, // Define radius values if needed
  defaultRadius: "sm", // Specify default radius
  spacing: {}, // Define spacing values if needed
  fontSizes: {}, // Define font sizes if needed
  lineHeights: {}, // Define line heights if needed
  breakpoints: {}, // Define breakpoints if needed
  shadows: {}, // Define shadows if needed
  respectReducedMotion: false, // Specify reduced motion preference
  cursorType: "default", // Specify default cursor type
  defaultGradient: { from: "#000", to: "#fff" }, // Specify default gradient
  activeClassName: "active", // Specify active class name
  focusClassName: "focus", // Specify focus class name
  components: {}, // Define components customization if needed
  other: {}, // Any other custom properties
});

const customDarkTheme = createTheme({
  black: "#A0E9FF",
  white: "#142850",
  focusRing: "auto", // Specify the desired focus ring behavior
  scale: 1, // Specify the scale if needed
  fontSmoothing: true, // Specify font smoothing preference
  colors: {}, // You can define additional colors if required
  primaryShade: { light: 6, dark: 8 }, // Specify primary shade for light and dark themes
  primaryColor: "blue", // Specify the primary color key
  autoContrast: false, // Specify auto contrast preference
  luminanceThreshold: 0.3, // Specify luminance threshold
  fontFamily: "system-ui", // Specify the main font family
  fontFamilyMonospace: "monospace", // Specify monospace font family
  headings: {
    fontFamily: "system-ui", // Specify font family for headings
    fontWeight: "normal", // Specify font weight for headings
    textWrap: "wrap", // Specify text wrap behavior for headings
  },
  radius: {}, // Define radius values if needed
  defaultRadius: "sm", // Specify default radius
  spacing: {}, // Define spacing values if needed
  fontSizes: {}, // Define font sizes if needed
  lineHeights: {}, // Define line heights if needed
  breakpoints: {}, // Define breakpoints if needed
  shadows: {}, // Define shadows if needed
  respectReducedMotion: false, // Specify reduced motion preference
  cursorType: "default", // Specify default cursor type
  defaultGradient: { from: "#000", to: "#fff" }, // Specify default gradient
  activeClassName: "active", // Specify active class name
  focusClassName: "focus", // Specify focus class name
  components: {}, // Define components customization if needed
  other: {}, // Any other custom properties
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={monserrat.className}>
        <MantineProvider defaultColorScheme="auto">
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
