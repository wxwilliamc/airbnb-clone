import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
// Components
import Navbar from '@/app/components/navbar/navbar'
import RegisterModal from '@/app/components/modals/registerModal'
import LoginModal from '@/app/components/modals/loginModal'
import RentModal from '@/app/components/modals/rentModal'
import SearchModal from '@/app/components/modals/searchModal'
// Toaster
import ToasterProvider from './providers/ToasterProvider'
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
