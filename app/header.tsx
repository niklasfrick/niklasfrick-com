'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { DesktopMenu } from '@/components/ui/desktop-menu'
import { MobileMenu } from '@/components/ui/mobile-menu'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-6 flex items-center justify-between sm:mb-8">
      <div className="min-w-0 flex-1 pr-4">
        <Link
          href="/"
          className="inline-block text-xl font-medium text-black sm:text-2xl md:text-3xl dark:text-white"
        >
          Niklas Frick
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="truncate text-base text-zinc-600 sm:text-lg md:text-xl dark:text-zinc-500"
          delay={0.5}
        >
          Platform Engineer
        </TextEffect>
      </div>

      {/* Navigation Menus */}
      <DesktopMenu />
      <MobileMenu />
    </header>
  )
}
