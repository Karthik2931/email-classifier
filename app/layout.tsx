import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Classifier - MagicSlides.app',
  description: 'Classify your emails using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
