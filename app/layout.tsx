import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Modal, Navbar } from './components'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb-Clone',
  description: 'Created By William Chong Wen Xuan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <Modal 
          actionLabel='Submit'
          isOpen
          title="Choose Something"
        />
        {children}
      </body>
    </html>
  )
}
