import type { Metadata } from "next";
import { Bodoni_Moda, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MUSE — Aesthetic Clinic, London · The Autumn Edit",
  description:
    "Advanced facials, injectables and laser therapy in a private Marylebone clinic. Consultation-first, edited to your skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${archivo.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
