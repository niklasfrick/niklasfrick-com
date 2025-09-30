/**
 * Blog post types - separated to avoid bundling server-only code in client components
 */

export interface BlogPost {
  title: string
  description: string
  link: string
  uid: string
  date: string
  lastUpdated: string
  coverImage?: string | null
}
