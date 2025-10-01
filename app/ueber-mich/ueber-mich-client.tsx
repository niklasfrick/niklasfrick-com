'use client'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { CompanyLogo } from '@/components/ui/company-logo'

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

interface UeberMichClientProps {
  workExperience: Array<{
    company: string
    title: string
    start: string
    end: string
    link: string
    id: string
    logo?: string
  }>
}

export function UeberMichClient({ workExperience }: UeberMichClientProps) {
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
        <h1 className="mb-4 text-2xl font-medium sm:mb-5 sm:text-3xl md:text-4xl">
          Über mich
        </h1>
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400">
            Als Platform Engineer und Solutions Architect entwickle ich
            Entwicklerplattformen, die Teams dabei unterstützen, effizienter zu
            arbeiten und bessere Software zu erstellen. Mit über 7 Jahren
            Erfahrung in Infrastruktur, DevOps-Tools und Plattform-Engineering
            helfe ich Teams dabei, komplexe technische Konzepte zu verstehen und
            in praktische Lösungen umzusetzen.
          </p>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-400">
            Durch Artikel, Schulungen und praktische Anleitungen teile ich mein
            Wissen, um komplexe Infrastruktur-Herausforderungen verständlich zu
            machen und Entwicklerteams produktiver zu machen.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-xl font-medium sm:mb-5 sm:text-2xl">
          Fähigkeiten & Technologien
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50">
            <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Cloud & Infrastructure
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              AWS, Azure, GCP, Terraform, Kubernetes, Docker
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50">
            <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              DevOps & Platform Engineering
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              CI/CD, GitOps, Monitoring, Observability, Platform APIs
            </p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50">
            <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Developer Experience
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Internal Developer Platforms, Self-Service Tools, Developer
              Portals
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-xl font-medium sm:mb-5 sm:text-2xl">
          Berufserfahrung
        </h3>
        <div className="flex flex-col space-y-3 sm:space-y-2">
          {workExperience.map((job) => {
            const content = (
              <>
                <Spotlight
                  className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-3 sm:p-4 dark:bg-zinc-950">
                  <div className="relative flex w-full flex-row items-center justify-between gap-2 sm:gap-3">
                    <div className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3">
                      <CompanyLogo
                        companyName={job.company}
                        logoUrl={job.logo}
                        size={40}
                        className="h-10 w-10 flex-shrink-0 rounded-lg object-contain sm:h-12 sm:w-12"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-base font-normal sm:text-lg md:text-xl dark:text-zinc-100">
                          {job.title}
                        </h4>
                        <p className="truncate text-sm text-zinc-500 sm:text-base md:text-lg dark:text-zinc-400">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <p className="flex-shrink-0 text-sm whitespace-nowrap text-zinc-600 sm:text-base md:text-lg dark:text-zinc-400">
                      {job.start} - {job.end}
                    </p>
                  </div>
                </div>
              </>
            )

            return job.link ? (
              <a
                className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                key={job.id}
              >
                {content}
              </a>
            ) : (
              <div
                className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
                key={job.id}
              >
                {content}
              </div>
            )
          })}
        </div>
      </motion.section>
    </motion.main>
  )
}
