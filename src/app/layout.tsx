import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "./components/header";
import { Footer } from "./components/mantine-footer";

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
        <MantineProvider defaultColorScheme="dark">
          <header>
            <Header />
          </header>
          {children}
          {/* Footer */}
          <footer>
            <Footer />
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}
