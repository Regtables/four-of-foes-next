import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { jost } from './lib/fonts'
import './globals.css'
import ModalProvider from '@/components/providers/ModalProvider'
import { BookingFormProvider } from '@/context/BookingFormContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Four of Foes',
  description: 'The coolest tattoo website ever made',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <BookingFormProvider>
          <div>
            {children}
          </div>
          <ModalProvider />
        </BookingFormProvider>
      </body>
    </html>
  )
}
