import { PROJECTS, WORK_EXPERIENCE, EMAIL, SOCIAL_LINKS } from './data'
import { getLatestBlogPosts } from '@/lib/blog-server-utils'
import { HomePageClient } from './home-page-client'

export default async function Personal() {
  // Fetch the latest 3 blog posts
  const latestBlogPosts = await getLatestBlogPosts(3)

  return (
    <HomePageClient
      projects={PROJECTS}
      workExperience={WORK_EXPERIENCE}
      latestBlogPosts={latestBlogPosts}
      email={EMAIL}
      socialLinks={SOCIAL_LINKS}
    />
  )
}
