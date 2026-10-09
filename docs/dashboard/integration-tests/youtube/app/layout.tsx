import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GemOS · YouTube test",
  description: "Private read-only Shorts test with one shared Google connection.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
