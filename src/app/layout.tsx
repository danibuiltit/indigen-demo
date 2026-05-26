import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indigen Demo",
  description: "Standalone Indigen IKS AI preview extracted from the Monolyth portfolio.",
};

export const viewport: Viewport = {
  themeColor: "#0b0f0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
