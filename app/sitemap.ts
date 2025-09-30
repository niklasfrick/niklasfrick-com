import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { getAllBlogPosts } from '@/lib/blog-server-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const blogPosts = await getAllBlogPosts()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${WEBSITE_URL}${post.link}`,
    lastModified: new Date(post.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
