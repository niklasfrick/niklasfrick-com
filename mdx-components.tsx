import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { BlogDateDisplay } from '@/components/ui/blog-date-display'
import { MetadataBlogDateDisplay } from '@/components/ui/metadata-blog-date-display'
import { AutoMetadataBlogDateDisplay } from '@/components/ui/auto-metadata-blog-date-display'
import { MetadataDisplay } from '@/components/ui/metadata-display'
import { EnhancedCodeBlock } from '@/components/ui/enhanced-code-block'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
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
          <img src={src} alt={alt} className="rounded-xl" />
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
    MetadataBlogDateDisplay: ({
      date,
      lastUpdated,
      className,
    }: {
      date: string
      lastUpdated?: string
      className?: string
    }) => {
      return (
        <MetadataBlogDateDisplay
          date={date}
          lastUpdated={lastUpdated}
          className={className}
        />
      )
    },
    AutoMetadataBlogDateDisplay: ({
      title,
      description,
      date,
      lastUpdated,
      className,
    }: {
      title: string
      description: string
      date: string
      lastUpdated?: string
      className?: string
    }) => {
      return (
        <AutoMetadataBlogDateDisplay
          title={title}
          description={description}
          date={date}
          lastUpdated={lastUpdated}
          className={className}
        />
      )
    },
    MetadataDisplay: ({ className }: { className?: string }) => {
      return <MetadataDisplay className={className} />
    },
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
      // Check if this is a code block
      if (
        children &&
        typeof children === 'object' &&
        'type' in children &&
        children.type === 'code'
      ) {
        const codeElement = children as any
        const className = codeElement.props?.className || ''

        // Parse language and filename from className
        // Format: language:file/path/filename.js
        const langMatch = className.match(/language-([^:]+)(?::(.+))?/)
        const language = langMatch ? langMatch[1] : 'text'
        const filename = langMatch ? langMatch[2] : undefined

        let codeContent = codeElement.props?.children || ''

        // If no filename in className, check for filename in comment format like // filename.js or # filename.py
        if (!filename) {
          const filenameMatch = codeContent.match(/^(?:\/\/|#)\s*([^\s]+\.\w+)/)
          if (filenameMatch) {
            const commentFilename = filenameMatch[1]
            // Remove the filename comment from the code content
            codeContent = codeContent.replace(
              /^(?:\/\/|#)\s*[^\s]+\.\w+\s*\n?/,
              '',
            )
            return (
              <EnhancedCodeBlock
                language={language}
                filename={commentFilename}
                showLineNumbers={true}
              >
                {codeContent}
              </EnhancedCodeBlock>
            )
          }
        }

        return (
          <EnhancedCodeBlock
            language={language}
            filename={filename}
            showLineNumbers={true}
          >
            {codeContent}
          </EnhancedCodeBlock>
        )
      }

      // Fallback to regular pre element
      return <pre {...props}>{children}</pre>
    },
  }
}
