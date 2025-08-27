import { BLOG_POSTS } from '../data'
import { getBlogPostCoverImage } from '@/lib/blog-utils'
import { BlogPageClient } from './blog-page-client'

export default async function BlogPage() {
    // Fetch cover images for all blog posts
    const postsWithCoverImages = await Promise.all(
        BLOG_POSTS.map(async (post) => {
            const coverImage = await getBlogPostCoverImage(post.link);
            return {
                ...post,
                coverImage
            };
        })
    );

    return <BlogPageClient posts={postsWithCoverImages} />
}
