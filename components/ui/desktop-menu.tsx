'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesktopMenu() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
    ]

    return (
        <nav className="hidden md:flex items-center space-x-6 flex-shrink-0">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 whitespace-nowrap ${pathname === item.href
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
