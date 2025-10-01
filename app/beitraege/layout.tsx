'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MDXProviderWrapper } from '@/app/mdx-provider'

function CopyButton() {
  const [text, setText] = useState('Kopieren')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (!isCopied) {
      try {
        const fullUrl = window.location.href
        await navigator.clipboard.writeText(fullUrl)
        setText('Kopiert')
        setIsCopied(true)
      } catch (err) {
        console.error('Failed to copy URL:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = window.location.href
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setText('Kopiert')
        setIsCopied(true)
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="font-base flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center gap-1 px-2 text-center text-xs text-zinc-500 transition-colors sm:text-sm md:text-base dark:text-zinc-400"
      type="button"
      aria-label="Copy URL"
    >
      <span className="hidden sm:inline">URL</span>
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
  const isBlogListingPage = pathname === '/beitraege'

  return (
    <>
      {!isBlogListingPage && (
        <>
          <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
          <ScrollProgress
            className="fixed top-0 z-20 h-1"
            springOptions={{
              bounce: 0,
            }}
          />

          <div className="absolute top-24 right-2 sm:top-32 sm:right-4 md:top-40">
            <CopyButton />
          </div>
        </>
      )}
      <main
        className={`w-full ${!isBlogListingPage ? 'prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:md:text-4xl prose-h1:font-medium prose-h2:mt-8 prose-h2:sm:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-3xl prose-h2:font-medium prose-h3:text-lg prose-h3:sm:text-xl prose-h3:md:text-2xl prose-h3:font-medium prose-h4:text-base prose-h4:sm:text-lg prose-h4:font-medium prose-h5:text-base prose-h5:sm:text-base prose-h5:font-medium prose-h6:text-base prose-h6:sm:text-base prose-h6:font-medium prose-strong:font-medium prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg prose-img:max-w-none prose-img:w-full prose-img:rounded-lg mt-12 max-w-none pb-12 sm:mt-16 sm:pb-16 md:mt-24 md:pb-20' : ''}`}
      >
        {!isBlogListingPage && (
          <div className="mb-6 sm:mb-8">
            <Link
              href="/beitraege"
              className="inline-flex min-h-[44px] touch-manipulation items-center gap-2 text-xs text-zinc-600 no-underline transition-colors duration-200 hover:text-zinc-900 sm:text-sm dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← <span>alle Beiträge</span>
            </Link>
          </div>
        )}
        <MDXProviderWrapper>{children}</MDXProviderWrapper>
      </main>
    </>
  )
}
