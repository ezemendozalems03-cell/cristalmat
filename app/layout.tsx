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

export const metadata: Metadata = {
  title: 'Cristalmat — Soluciones premium para exteriores',
  description:
    'Fabricación propia de Garden Blocks, premoldeados de hormigón y pisos drenantes. Diseño, resistencia y drenaje para espacios que duran décadas.',
  generator: 'v0.app',
  keywords: [
    'Garden Blocks',
    'pisos drenantes',
    'premoldeados de hormigón',
    'pavimentos permeables',
    'Cristalmat',
    'exteriores',
  ],
  openGraph: {
    title: 'Cristalmat — Soluciones premium para exteriores',
    description:
      'No construimos pisos. Construimos espacios que duran décadas. Garden Blocks, pisos drenantes y premoldeados de fabricación propia.',
    type: 'website',
  },
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
