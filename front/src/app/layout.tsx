import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloProvider from '../components/ApolloProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arbitrum Security Council Election Dashboard",
    template: "%s | Arbitrum Security Council Election"
  },
  description: "Real-time voting transparency platform for Arbitrum delegates to monitor and track Security Council elections with complete visibility into the democratic process.",
  keywords: [
    "Arbitrum",
    "Security Council",
    "Election",
    "Voting",
    "Governance",
    "Blockchain",
    "DAO",
    "Democracy",
    "Transparency",
    "Delegates",
    "Real-time",
    "Dashboard"
  ],
  authors: [{ name: "Arbitrum Community" }],
  creator: "Arbitrum Community",
  publisher: "Arbitrum Community",
  category: "Blockchain Governance",
  classification: "Governance Dashboard",
  manifest: '/manifest.json',
  metadataBase: new URL('https://arbitrum-security-council.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Arbitrum Security Council Election Dashboard',
    description: 'Real-time voting transparency platform for Arbitrum delegates to monitor and track Security Council elections with complete visibility into the democratic process.',
    siteName: 'Arbitrum Security Council Election',
    images: [
      {
        url: '/icon-512.svg',
        width: 512,
        height: 512,
        alt: 'Arbitrum Security Council Election Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbitrum Security Council Election Dashboard',
    description: 'Real-time voting transparency platform for Arbitrum delegates to monitor Security Council elections.',
    images: ['/icon-512.svg'],
    creator: '@arbitrum',
    site: '@arbitrum',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2D5BFF' },
    { media: '(prefers-color-scheme: dark)', color: '#2D5BFF' },
  ],
  colorScheme: 'dark light',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    other: [
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
  other: {
    'application-name': 'Arbitrum Security Council Election',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'ARB Council Election',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': 'none',
    'msapplication-TileColor': '#2D5BFF',
    'msapplication-tap-highlight': 'no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
