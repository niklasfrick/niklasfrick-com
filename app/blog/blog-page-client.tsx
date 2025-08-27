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
            className="space-y-12"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-50 mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Gedanken, Erfahrungen und Einblicke in Design, Entwicklung und Technologie.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="grid grid-cols-1 gap-8">
                    {posts.map((post) => (
                        <motion.article
                            key={post.uid}
                            className="group"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href={post.link} className="block">
                                <div className="relative overflow-hidden rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50 transition-all duration-200 group-hover:ring-zinc-300/50 dark:group-hover:ring-zinc-700/50">
                                    <AnimatedBackground
                                        enableHover
                                        className="h-full w-full rounded-xl bg-zinc-100 dark:bg-zinc-900/80"
                                        transition={{
                                            type: 'spring',
                                            bounce: 0,
                                            duration: 0.2,
                                        }}
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-col space-y-4">
                                                {/* Cover Image */}
                                                {post.coverImage && (
                                                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                                                        <img
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}

                                                <div className="space-y-3">
                                                    <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200">
                                                        {post.title}
                                                    </h2>
                                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                        {post.description}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-sm text-zinc-400 dark:text-zinc-500">
                                                        <span>{formatDate(post.date)}</span>
                                                        {post.lastUpdated !== post.date && (
                                                            <>
                                                                <span>•</span>
                                                                <span>Aktualisiert: {formatDate(post.lastUpdated)}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedBackground>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </motion.section>
        </motion.main>
    )
}
