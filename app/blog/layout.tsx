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
      className="font-base flex items-center gap-1 text-center text-xs sm:text-sm md:text-base text-zinc-500 transition-colors dark:text-zinc-400 touch-manipulation min-h-[44px] min-w-[44px] justify-center px-2"
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

          <div className="absolute right-2 sm:right-4 top-24 sm:top-32 md:top-40">
            <CopyButton />
          </div>
        </>
      )}
      <main className={`w-full ${!isBlogListingPage ? 'prose prose-gray mt-12 sm:mt-16 md:mt-24 pb-12 sm:pb-16 md:pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:md:text-4xl prose-h1:font-medium prose-h2:mt-8 prose-h2:sm:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-3xl prose-h2:font-medium prose-h3:text-lg prose-h3:sm:text-xl prose-h3:md:text-2xl prose-h3:font-medium prose-h4:text-base prose-h4:sm:text-lg prose-h4:font-medium prose-h5:text-base prose-h5:sm:text-base prose-h5:font-medium prose-h6:text-base prose-h6:sm:text-base prose-h6:font-medium prose-strong:font-medium prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg prose-img:max-w-none prose-img:w-full prose-img:rounded-lg max-w-none' : ''}`}>
        {!isBlogListingPage && (
          <div className="mb-6 sm:mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200 no-underline touch-manipulation min-h-[44px]"
            >
              ← <span>alle Beiträge</span>
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
