import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://niklasfrick.com/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default:
      'Niklas Frick - Platform Engineer (Kubernetes, DevOps,Cloud Native)',
    template: '%s | Niklas Frick',
  },
  description:
    'Beiträge, Projekte und Vorträge zu Platform Engineering, Kubernetes und DevOps in Liechtenstein und der Schweiz.',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <Head>
        {typeof window !== 'undefined' &&
          window.location.hostname === 'niklasfrick.com' && (
            <>
              <script
                async
                defer
                data-domain="niklasfrick.com"
                src="https://plausible.balzers.xyz/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.plausible =
                    window.plausible ||
                    function () {
                      (window.plausible.q = window.plausible.q || []).push(
                        arguments
                      );
                    };
                  `,
                }}
              />
            </>
          )}
      </Head>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-md flex-1 px-4 pt-16 sm:px-6 sm:pt-20 md:px-8">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
