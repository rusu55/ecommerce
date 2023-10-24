
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/auth-provider'
import ModalProvider from '@/providers/modal-provider'
import LoginModalProvider from '@/providers/login-modal-provider'
import RegisterModalProvider from '@/providers/register-modal-provider'
import ClientModalProvider from '@/providers/client-modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import NavBar from '@/components/nav/NavBar'
import SideNav from '@/components/sideNav/sideNav'
import { Sidebar } from 'lucide-react'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin DashBoard',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 bg-gray-50`}>

      <AuthProvider> 
          <ToastProvider />         
          <ModalProvider />
          <LoginModalProvider />
          <RegisterModalProvider />
          <ClientModalProvider />        
          <div className='flex gap-2'>
            <SideNav />
            <main className="max-w-7xl flex-1 mx-auto py-4">
             {children}
            </main>
          </div>      
      </AuthProvider>
      </body>
    </html>
  )
}
