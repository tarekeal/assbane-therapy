import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assbane Therapy",
  description:
    "Cabinet de thérapie multidisciplinaire à Molenbeek — kinésithérapie, psychologie, pédicure médicale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
