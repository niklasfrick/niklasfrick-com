'use client'

import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { CodeBlockWrapper } from '@/components/ui/code-block-wrapper'
import { BlogDateDisplay } from '@/components/ui/blog-date-display'

const components = {
  Cover: ({
    src,
    alt,
    caption,
  }: {
    src: string
    alt: string
    caption: string
  }) => {
    return (
      <figure>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          className="rounded-xl"
        />
        <figcaption className="text-center">{caption}</figcaption>
      </figure>
    )
  },
  BlogDateDisplay: ({
    date,
    lastUpdated,
    className,
  }: {
    date: string
    lastUpdated: string
    className?: string
  }) => {
    return (
      <BlogDateDisplay
        date={date}
        lastUpdated={lastUpdated}
        className={className}
      />
    )
  },
  pre: CodeBlockWrapper,
}

export function MDXProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
