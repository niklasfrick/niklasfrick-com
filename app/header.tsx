'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { DesktopMenu } from '@/components/ui/desktop-menu'
import { MobileMenu } from '@/components/ui/mobile-menu'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-6 sm:mb-8 flex items-center justify-between">
      <div className="flex-1 min-w-0 pr-4">
        <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-medium text-black dark:text-white inline-block">
          Niklas Frick
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-500 truncate"
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
