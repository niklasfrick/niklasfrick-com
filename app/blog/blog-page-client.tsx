'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { formatDate } from '@/lib/blog-utils'
import { AnimatedBackground } from '@/components/ui/animated-background'

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
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4">
                        Blog
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Gedanken, Erfahrungen und Einblicke in Design, Entwicklung und Technologie.
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
                                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50 transition-all duration-200 group-hover:ring-zinc-300/50 dark:group-hover:ring-zinc-700/50 h-full">
                                    <div className="h-full w-full rounded-lg sm:rounded-xl bg-white dark:bg-zinc-950 transition-all duration-200 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900/80">
                                        <div className="p-4 sm:p-6 h-full">
                                            <div className="flex flex-col space-y-3 sm:space-y-4">
                                                {/* Cover Image */}
                                                {post.coverImage && (
                                                    <div className="aspect-video w-full rounded-md sm:rounded-lg overflow-hidden">
                                                        <img
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}

                                                <div className="space-y-2 sm:space-y-3">
                                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                                                        {post.description}
                                                    </p>
                                                    <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">
                                                        <span>{formatDate(post.date)}</span>
                                                        {post.lastUpdated !== post.date && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="hidden sm:inline">Aktualisiert: {formatDate(post.lastUpdated)}</span>
                                                                <span className="sm:hidden">{formatDate(post.lastUpdated)}</span>
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
