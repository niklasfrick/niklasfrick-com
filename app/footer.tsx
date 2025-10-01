'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { CliTextLoop } from '@/components/ui/cli-text-loop'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Hell',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dunkel',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
      defaultValue={theme}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className="inline-flex h-9 w-9 touch-manipulation items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 sm:h-8 sm:w-8 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={`Wechseln zu ${theme.label} Theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-100 px-0 py-4 pb-12 sm:mt-24 sm:pb-4 dark:border-zinc-800">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
        <CliTextLoop
          className="w-full max-w-full min-w-0 text-xs text-zinc-500 sm:flex-1 sm:text-sm"
          interval={5}
          typingSpeed={120}
          prompt="niklas@localhost"
        >
          <span>© {new Date().getFullYear()} Niklas Frick.</span>
          <span>Gebraut mit Kaffee &amp; einer Prise KI-Magie ☕🤖</span>
          <span>
            vorlage:{' '}
            <a
              href="https://github.com/ibelick/nim"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              nim
            </a>
          </span>
        </CliTextLoop>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
          <div className="order-2 flex gap-4 text-xs text-zinc-400 sm:order-1">
            <a
              href="/impressum"
              className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Datenschutz
            </a>
          </div>
          <div className="order-1 flex-shrink-0 text-sm text-zinc-400 sm:order-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  )
}
