'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { SocialIcon } from '@/components/ui/social-icons'
import { formatDate } from '@/lib/blog-utils'
import { CompanyLogo } from '@/components/ui/company-logo'
import { BlogPost } from '@/lib/blog-utils'

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

type ProjectVideoProps = {
    src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
    return (
        <MorphingDialog
            transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.3,
            }}
        >
            <MorphingDialogTrigger className="w-full">
                <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-video w-full cursor-zoom-in rounded-lg sm:rounded-xl"
                />
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent className="relative aspect-video rounded-xl sm:rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 mx-4">
                    <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="aspect-video h-[40vh] sm:h-[50vh] md:h-[70vh] w-full rounded-lg sm:rounded-xl"
                    />
                </MorphingDialogContent>
                <MorphingDialogClose
                    className="fixed top-4 right-4 sm:top-6 sm:right-6 h-fit w-fit rounded-full bg-white p-2 shadow-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    variants={{
                        initial: { opacity: 0 },
                        animate: {
                            opacity: 1,
                            transition: { delay: 0.3, duration: 0.1 },
                        },
                        exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                    aria-label="Close video"
                >
                    <XIcon className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-500" />
                </MorphingDialogClose>
            </MorphingDialogContainer>
        </MorphingDialog>
    )
}

function MagneticSocialLink({
    children,
    link,
    icon,
}: {
    children: React.ReactNode
    link: string
    icon: string
}) {
    return (
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full bg-zinc-100 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 touch-manipulation min-h-[44px]"
            >
                <SocialIcon icon={icon} className="flex-shrink-0" />
                <span className="whitespace-nowrap">{children}</span>
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 flex-shrink-0"
                >
                    <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </a>
        </Magnetic>
    )
}

interface HomePageClientProps {
    projects: Array<{
        name: string
        description: string
        link: string
        video: string
        id: string
    }>
    workExperience: Array<{
        company: string
        title: string
        start: string
        end: string
        link: string
        id: string
        logo?: string
    }>
    latestBlogPosts: BlogPost[]
    email: string
    socialLinks: Array<{
        label: string
        link: string
        icon: string
    }>
}

export function HomePageClient({
    projects,
    workExperience,
    latestBlogPosts,
    email,
    socialLinks,
}: HomePageClientProps) {
    return (
        <motion.main
            className="space-y-12 sm:space-y-16 md:space-y-24"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="flex-1">
                    <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Fokussiert auf die Erstellung intuitiver und performanter Web-Erfahrungen.
                        Überbrückung der Lücke zwischen Design und Entwicklung.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <h3 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-medium">Ausgewählte Projekte</h3>
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    {projects.map((project) => (
                        <div key={project.name} className="space-y-2">
                            <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                                <ProjectVideo src={project.video} />
                            </div>
                            <div className="px-1">
                                <a
                                    className="font-base group relative inline-block font-[450] text-base sm:text-lg md:text-xl text-zinc-900 dark:text-zinc-50"
                                    href={project.link}
                                    target="_blank"
                                >
                                    {project.name}
                                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                                </a>
                                <p className="text-base sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <h3 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-medium">Berufserfahrung</h3>
                <div className="flex flex-col space-y-3 sm:space-y-2">
                    {workExperience.map((job) => (
                        <a
                            className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={job.id}
                        >
                            <Spotlight
                                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                                size={64}
                            />
                            <div className="relative h-full w-full rounded-[15px] bg-white p-3 sm:p-4 dark:bg-zinc-950">
                                <div className="relative flex w-full flex-row justify-between items-center gap-2 sm:gap-3">
                                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                        <CompanyLogo
                                            companyName={job.company}
                                            logoUrl={job.logo}
                                            size={40}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain flex-shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-base sm:text-lg md:text-xl font-normal dark:text-zinc-100 truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 truncate">
                                                {job.company}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 whitespace-nowrap flex-shrink-0">
                                        {job.start} - {job.end}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <h3 className="text-xl sm:text-2xl font-medium">Blog</h3>
                    <Link
                        href="/blog"
                        className="text-xs sm:text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200 whitespace-nowrap"
                    >
                        Alle Beiträge →
                    </Link>
                </div>
                <div className="flex flex-col space-y-0">
                    <AnimatedBackground
                        enableHover
                        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.2,
                        }}
                    >
                        {latestBlogPosts.map((post) => (
                            <Link
                                key={post.uid}
                                className="-mx-3 rounded-xl px-3 py-2 sm:py-3"
                                href={post.link}
                                data-id={post.uid}
                            >
                                <div className="flex flex-col space-y-1">
                                    <h4 className="text-base sm:text-lg md:text-xl font-normal dark:text-zinc-100 line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <p className="text-base sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </AnimatedBackground>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
            >
                <h3 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-medium">Kontakt</h3>
                <p className="mb-4 sm:mb-5 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
                    Kontaktieren Sie mich gerne unter{' '}
                    <a className="underline dark:text-zinc-300 whitespace-nowrap" href={`mailto:${email}`}>
                        {email}
                    </a>
                </p>
                <div className="flex items-center justify-start flex-wrap gap-2 sm:gap-3">
                    {socialLinks.map((link) => (
                        <MagneticSocialLink key={link.label} link={link.link} icon={link.icon}>
                            {link.label}
                        </MagneticSocialLink>
                    ))}
                </div>
            </motion.section>
        </motion.main>
    )
}
