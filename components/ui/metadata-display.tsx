'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate, getRelativeTime } from '@/lib/blog-utils'

interface BlogMetadata {
  title: string
  description: string
  date: string
  lastUpdated?: string
}

export function MetadataDisplay({ className = '' }: { className?: string }) {
  const [metadata, setMetadata] = useState<BlogMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    async function fetchMetadata() {
      try {
        // Extract the blog slug from the pathname
        const blogSlug = pathname.replace('/beitraege/', '').replace(/\/$/, '')
        if (!blogSlug || blogSlug === 'beitraege') {
          setLoading(false)
          return
        }

        // Try to fetch the MDX file content
        const response = await fetch(`/beitraege/${blogSlug}/page.mdx`)
        if (response.ok) {
          const mdxContent = await response.text()

          // Extract metadata using regex
          const metadataMatch = mdxContent.match(
            /export const metadata = \{([\s\S]*?)\};/,
          )
          if (metadataMatch) {
            const metadataBlock = metadataMatch[1]

            // Extract title
            const titleMatch = metadataBlock.match(
              /title:\s*['"`]([^'"`]+)['"`]/,
            )
            const title = titleMatch ? titleMatch[1] : ''

            // Extract description
            const descriptionMatch = metadataBlock.match(
              /description:\s*['"`]([^'"`]+)['"`]/,
            )
            const description = descriptionMatch ? descriptionMatch[1] : ''

            // Extract date
            const dateMatch = metadataBlock.match(/date:\s*['"`]([^'"`]+)['"`]/)
            const date = dateMatch ? dateMatch[1] : ''

            // Extract lastUpdated
            const lastUpdatedMatch = metadataBlock.match(
              /lastUpdated:\s*['"`]([^'"`]+)['"`]/,
            )
            const lastUpdated = lastUpdatedMatch
              ? lastUpdatedMatch[1]
              : undefined

            if (title && date) {
              setMetadata({ title, description, date, lastUpdated })
            }
          }
        }
      } catch (error) {
        console.warn('Could not fetch blog metadata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [pathname])

  if (loading || !metadata) {
    return null
  }

  const isUpdated = metadata.date !== metadata.lastUpdated

  return (
    <div className={className}>
      {/* Title */}
      <h1 className="mb-4 text-2xl font-medium">{metadata.title}</h1>

      {/* Description */}
      {metadata.description && (
        <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
          {metadata.description}
        </p>
      )}

      {/* Date Display */}
      <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
        <span>Erstellt am {formatDate(metadata.date)}</span>
        {isUpdated && metadata.lastUpdated && (
          <>
            <span>•</span>
            <span>
              Zuletzt aktualisiert {getRelativeTime(metadata.lastUpdated)}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
