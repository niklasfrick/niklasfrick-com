'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/blog-utils'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type BlogPostWithCover = {
  title: string
  description: string
  link: string
  uid: string
  date: string
  lastUpdated: string
  coverImage?: string | null
}

interface BlogPageClientProps {
  posts: BlogPostWithCover[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <motion.main
      className="w-full space-y-8 sm:space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-3 text-2xl font-medium text-zinc-900 sm:mb-4 sm:text-3xl md:text-4xl dark:text-zinc-50">
            Blog
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400">
            Gedanken, Erfahrungen und Einblicke in Design, Entwicklung und
            Technologie.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.uid}
              className="group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={post.link} className="block h-full">
                <div className="relative h-full overflow-hidden rounded-xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 transition-all duration-200 ring-inset group-hover:ring-zinc-300/50 sm:rounded-2xl dark:bg-zinc-950/40 dark:ring-zinc-800/50 dark:group-hover:ring-zinc-700/50">
                  <div className="h-full w-full rounded-lg bg-white transition-all duration-200 group-hover:bg-zinc-100 sm:rounded-xl dark:bg-zinc-950 dark:group-hover:bg-zinc-900/80">
                    <div className="h-full p-4 sm:p-6">
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        {/* Cover Image */}
                        {post.coverImage && (
                          <div className="aspect-video w-full overflow-hidden rounded-md sm:rounded-lg">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              width={800}
                              height={450}
                              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <div className="space-y-2 sm:space-y-3">
                          <h2 className="line-clamp-2 text-xl font-medium text-zinc-900 transition-colors duration-200 group-hover:text-zinc-700 sm:text-2xl md:text-3xl dark:text-zinc-50 dark:group-hover:text-zinc-300">
                            {post.title}
                          </h2>
                          <p className="line-clamp-3 text-base leading-relaxed text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400">
                            {post.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 sm:text-sm dark:text-zinc-500">
                            <span>{formatDate(post.date)}</span>
                            {post.lastUpdated !== post.date && (
                              <>
                                <span>•</span>
                                <span className="hidden sm:inline">
                                  Aktualisiert: {formatDate(post.lastUpdated)}
                                </span>
                                <span className="sm:hidden">
                                  {formatDate(post.lastUpdated)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
