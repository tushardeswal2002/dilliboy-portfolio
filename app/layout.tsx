import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.dilliboy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "DILLIBOY — Music Producer, DJ & Sound Designer",
    template: "%s — DILLIBOY",
  },

  description:
    "DILLIBOY is a Delhi-based music producer, DJ and sound designer creating music and audio for artists, film, games, advertising and branded content.",

  applicationName: "DILLIBOY",

  authors: [
    {
      name: "DILLIBOY",
      url: siteUrl,
    },
  ],

  creator: "DILLIBOY",
  publisher: "DILLIBOY",

  keywords: [
    "DILLIBOY",
    "DilliBoy",
    "music producer",
    "music producer Delhi",
    "DJ Delhi",
    "sound designer",
    "music production",
    "film sound design",
    "game audio",
    "advertising music",
    "Indian music producer",
    "Delhi music producer",
    "beat producer",
    "composer",
  ],

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DILLIBOY",

    title: "DILLIBOY — Music Producer, DJ & Sound Designer",

    description:
      "Music producer, DJ and sound designer creating music and audio for artists, film, games, advertising and branded content.",

    locale: "en_IN",

    images: [
      {
        url: "/dilliboy-og.png",
        width: 1200,
        height: 630,
        alt: "DILLIBOY — Music Producer, DJ & Sound Designer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "DILLIBOY — Music Producer, DJ & Sound Designer",

    description:
      "Music producer, DJ and sound designer creating music and audio for artists, film, games, advertising and branded content.",

    images: ["/dilliboy-og.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}