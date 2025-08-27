import { getAllBlogPosts } from '@/lib/blog-utils'
import { BlogPageClient } from './blog-page-client'

export default async function BlogPage() {
    // Automatically discover all blog posts
    const posts = await getAllBlogPosts();

    return <BlogPageClient posts={posts} />
}
