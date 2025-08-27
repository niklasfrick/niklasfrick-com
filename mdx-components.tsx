import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import { BlogDateDisplay } from '@/components/ui/blog-date-display'
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
      return <BlogDateDisplay date={date} lastUpdated={lastUpdated} className={className} />
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
      // Check if this is a code block
      if (children && typeof children === 'object' && 'type' in children && children.type === 'code') {
        const codeElement = children as any
        const className = codeElement.props?.className || ''
        const language = className.replace('language-', '') || 'text'

        // Extract filename from the first line if it starts with a comment
        let filename: string | undefined
        let codeContent = codeElement.props?.children || ''

        // Check for filename in comment format like // filename.js or # filename.py
        const filenameMatch = codeContent.match(/^(?:\/\/|#)\s*([^\s]+\.\w+)/)
        if (filenameMatch) {
          filename = filenameMatch[1]
          // Remove the filename comment from the code content
          codeContent = codeContent.replace(/^(?:\/\/|#)\s*[^\s]+\.\w+\s*\n?/, '')
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
