import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Git Pocket - Saved Articles Reader",
  description: "A modern, minimal reader for your saved articles from GitHub repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable} ${jetbrainsMono.variable}`}>
      <body className="font-serif antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
