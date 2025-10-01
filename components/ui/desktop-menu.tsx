'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesktopMenu() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/ueber-mich', label: 'Über mich' },
    { href: '/beitraege', label: 'Beiträge' },
  ]

  return (
    <nav className="hidden flex-shrink-0 items-center space-x-6 md:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${pathname === item.href
            ? 'text-zinc-900 dark:text-zinc-100'
            : 'text-zinc-600 dark:text-zinc-400'
            }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
