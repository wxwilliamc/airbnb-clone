import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
// Components
import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'
// Toaster
import ToasterProvider from '@/app/providers/ToasterProvider'
// Actions
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb-Clone',
  description: 'Created By William Chong Wen Xuan',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
