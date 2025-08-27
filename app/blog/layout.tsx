'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MDXProviderWrapper } from '@/app/mdx-provider'

function CopyButton() {
  const [text, setText] = useState('Kopieren')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Kopieren')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Kopiert')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base flex items-center gap-1 text-center text-base text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <span>URL</span>
      <TextMorph>{text}</TextMorph>
    </button>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBlogListingPage = pathname === '/blog'

  return (
    <>
      {!isBlogListingPage && (
        <>
          <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
          <ScrollProgress
            className="fixed top-0 z-20 h-1"
            springOptions={{
              bounce: 0,
            }}
          />

          <div className="absolute right-4 top-24">
            <CopyButton />
          </div>
        </>
      )}
      <main className={`${!isBlogListingPage ? 'prose prose-gray mt-24 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-2xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium prose-p:text-base' : ''}`}>
        {!isBlogListingPage && (
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200 no-underline"
            >
              ← Zurück zu allen Posts
            </Link>
          </div>
        )}
        <MDXProviderWrapper>
          {children}
        </MDXProviderWrapper>
      </main>
    </>
  )
}
