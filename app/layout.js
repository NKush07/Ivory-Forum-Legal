import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MV & Associates - Attorney at Law',
  description: 'Expert legal counsel with over 20 years of experience in business law, family law, civil litigation, and more. Dedicated to protecting your rights and achieving the best outcomes.',
  keywords: 'attorney, lawyer, legal services, business law, family law, civil litigation, estate planning, real estate law, criminal defense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
