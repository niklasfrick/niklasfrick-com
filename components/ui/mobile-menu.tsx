'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="relative z-50 md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="group relative z-50 flex h-11 w-11 touch-manipulation flex-col items-center justify-center focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ease-in-out dark:bg-zinc-100 ${
            isOpen ? 'translate-y-2 rotate-45' : 'translate-y-0'
          }`}
        />
        <span
          className={`my-1.5 block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ease-in-out dark:bg-zinc-100 ${
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ease-in-out dark:bg-zinc-100 ${
            isOpen ? '-translate-y-2 -rotate-45' : 'translate-y-0'
          }`}
        />
      </button>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-white transition-all duration-500 dark:bg-zinc-950 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative flex h-full flex-col items-center justify-center px-8 transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Navigation Items */}
          <nav className="mb-16 flex flex-col items-center space-y-8 sm:space-y-10">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <div
                  key={item.href}
                  className={`transition-all duration-500 ${
                    isOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${200 + index * 100}ms` : '0ms',
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className={`group relative block touch-manipulation py-2 text-4xl font-medium transition-all duration-300 sm:text-5xl md:text-6xl ${
                      isActive
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-100'
                    }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-zinc-900 sm:-bottom-2 sm:h-1 dark:bg-zinc-100" />
                    )}
                    {/* Hover effect */}
                    {!isActive && (
                      <span className="absolute right-0 -bottom-1 left-0 h-0.5 origin-left scale-x-0 rounded-full bg-zinc-900 transition-transform duration-300 group-hover:scale-x-100 sm:-bottom-2 sm:h-1 dark:bg-zinc-100" />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Decorative Bottom Section */}
          <div
            className={`absolute right-0 bottom-12 left-0 flex flex-col items-center space-y-4 transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms',
            }}
          >
            {/* Decorative dots */}
            <div className="flex items-center space-x-2">
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700"
                style={{ animationDelay: '300ms' }}
              />
            </div>

            {/* Optional text */}
            <p className="text-xs tracking-wider text-zinc-400 uppercase dark:text-zinc-600">
              Niklas Frick
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
