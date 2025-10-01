/**
 * Server-only blog utilities that use Node.js APIs
 * These functions cannot be used in client components
 */

import 'server-only'
import { BlogPost } from './blog-types'
import { getCurrentDate } from './blog-utils'

export function extractCoverImageFromMDX(mdxContent: string): string | null {
  // Look for Cover component usage in MDX content
  const coverMatch = mdxContent.match(/<Cover\s+src="([^"]+)"[^>]*>/)
  return coverMatch ? coverMatch[1] : null
}

export async function getBlogPostCoverImage(
  slug: string,
): Promise<string | null> {
  try {
    // Remove the /blog/ prefix from the slug if present
    const cleanSlug = slug.replace('/blog/', '')

    // Try to read the MDX file content
    const fs = await import('fs/promises')
    const path = await import('path')

    const mdxPath = path.join(
      process.cwd(),
      'app',
      'blog',
      cleanSlug,
      'page.mdx',
    )
    const mdxContent = await fs.readFile(mdxPath, 'utf-8')

    return extractCoverImageFromMDX(mdxContent)
  } catch (error) {
    console.warn(`Could not read cover image for blog post: ${slug}`, error)
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')

    const blogDir = path.join(process.cwd(), 'app', 'beitraege')
    const entries = await fs.readdir(blogDir, { withFileTypes: true })

    const blogPosts: BlogPost[] = []

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'layout') {
        const mdxPath = path.join(blogDir, entry.name, 'page.mdx')

        try {
          const mdxContent = await fs.readFile(mdxPath, 'utf-8')
          const metadata = extractMetadataFromMDX(mdxContent)

          if (metadata) {
            const coverImage = extractCoverImageFromMDX(mdxContent)

            blogPosts.push({
              title: metadata.title,
              description: metadata.description,
              link: `/beitraege/${entry.name}`,
              uid: entry.name,
              date: metadata.date,
              lastUpdated: metadata.lastUpdated || metadata.date,
              coverImage,
            })
          }
        } catch (error) {
          console.warn(`Could not read blog post: ${entry.name}`, error)
        }
      }
    }

    // Sort by date (newest first)
    return blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function extractMetadataFromMDX(mdxContent: string): {
  title: string
  description: string
  date: string
  lastUpdated?: string
} | null {
  try {
    // Extract metadata from the export const metadata = { ... } block
    const metadataMatch = mdxContent.match(
      /export const metadata = \{([\s\S]*?)\}/,
    )

    if (!metadataMatch) {
      return null
    }

    const metadataBlock = metadataMatch[1]

    // Extract title - handle multiline strings
    const titleMatch = metadataBlock.match(/title:\s*['"`]([^'"`\n]+)['"`]/)
    const title = titleMatch ? titleMatch[1] : 'Untitled'

    // Extract description - handle multiline strings
    const descriptionMatch = metadataBlock.match(
      /description:\s*['"`]([^'"`\n]*?)['"`]/,
    )
    const description = descriptionMatch ? descriptionMatch[1].trim() : ''

    // Extract date
    const dateMatch = metadataBlock.match(/date:\s*['"`]([^'"`\n]+)['"`]/)
    const date = dateMatch ? dateMatch[1] : getCurrentDate()

    // Extract lastUpdated (optional)
    const lastUpdatedMatch = metadataBlock.match(
      /lastUpdated:\s*['"`]([^'"`\n]+)['"`]/,
    )
    const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1] : undefined

    return {
      title,
      description,
      date,
      lastUpdated,
    }
  } catch (error) {
    console.warn('Error extracting metadata from MDX:', error)
    return null
  }
}

export async function getLatestBlogPosts(
  count: number = 3,
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, count)
}
