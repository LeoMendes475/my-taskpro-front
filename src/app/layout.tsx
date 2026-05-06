import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { QueryProvider } from '@/providers/QueryProvider'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MyTask Pro',
  description: 'Gerencie suas tarefas com eficiência',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jetbrainsMono.variable}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}