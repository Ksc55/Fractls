import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fractls',
  description: 'Fractls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-24 py-10`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
