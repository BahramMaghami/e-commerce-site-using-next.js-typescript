import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import '@/assets/styles/globals.css'
import { cn } from '@/lib/utils'
import { APP_NAME, SERVER_URL } from '@/lib/constants'
import { NEXT_PUBLIC_APP_DESCRIPTION } from '@/lib/constants'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_NAME,
  },
  description: `${NEXT_PUBLIC_APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        '}',
        'h-full',
        'antialiased',
        inter.className,
        'font-sans',
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  )
}
