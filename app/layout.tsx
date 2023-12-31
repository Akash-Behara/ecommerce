import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'E-SHOP',
  description: 'E-Commerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <CartProvider>
          <Toaster toastOptions={{
            style: {background: 'rgb(51 65 85)', color: '#fff'}
          }}/>
          <div className='flex min-h-screen flex-col'>
            <NavBar />
            <main className='flex-grow'>
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
