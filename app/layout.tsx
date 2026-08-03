import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cristalmat.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Cristalmat | Garden Blocks, pisos atérmicos y revestimientos',
  description:
    'Garden Blocks para tránsito vehicular, premoldeados de hormigón, pisos atérmicos, Wall Panel, pisos flotantes y deck de PVC en San Miguel.',
  generator: 'v0.app',
  keywords: [
    'Garden Blocks',
    'bloques para césped',
    'pisos para tránsito vehicular',
    'premoldeados de hormigón',
    'bordes atérmicos para piscinas',
    'Wall Panel',
    'San Miguel',
    'Buenos Aires',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Cristalmat | Garden Blocks, pisos atérmicos y revestimientos',
    description:
      'Garden Blocks para tránsito vehicular, premoldeados de hormigón, pisos atérmicos, Wall Panel, pisos flotantes y deck de PVC en San Miguel.',
    type: 'website',
    locale: 'es_AR',
    images: ['/images/hero-driveway.png'],
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cristalmat',
  image: `${siteUrl}/images/hero-driveway.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Córdoba 2675',
    addressLocality: 'San Miguel',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  telephone: '+5491157467538',
  url: siteUrl,
  sameAs: ['https://instagram.com/cristalmat_ok'],
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background ${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
