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
        <div className="md:hidden relative z-50">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="relative flex flex-col justify-center items-center w-11 h-11 focus:outline-none group z-50 touch-manipulation"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <span
                    className={`block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-in-out my-1.5 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
                        }`}
                />
            </button>

            {/* Full Screen Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-white dark:bg-zinc-950 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={toggleMenu}
                />

                {/* Menu Content */}
                <div
                    className={`relative h-full flex flex-col items-center justify-center px-8 transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                >
                    {/* Navigation Items */}
                    <nav className="flex flex-col items-center space-y-8 sm:space-y-10 mb-16">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href
                            return (
                                <div
                                    key={item.href}
                                    className={`transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                    style={{
                                        transitionDelay: isOpen ? `${200 + index * 100}ms` : '0ms'
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className={`group relative text-4xl sm:text-5xl md:text-6xl font-medium transition-all duration-300 touch-manipulation block py-2 ${isActive
                                            ? 'text-zinc-900 dark:text-zinc-100'
                                            : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100'
                                            }`}
                                    >
                                        {item.label}
                                        {/* Active indicator */}
                                        {isActive && (
                                            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                                        )}
                                        {/* Hover effect */}
                                        {!isActive && (
                                            <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-zinc-900 dark:bg-zinc-100 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        )}
                                    </Link>
                                </div>
                            )
                        })}
                    </nav>

                    {/* Decorative Bottom Section */}
                    <div
                        className={`absolute bottom-12 left-0 right-0 flex flex-col items-center space-y-4 transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        style={{
                            transitionDelay: isOpen ? '400ms' : '0ms'
                        }}
                    >
                        {/* Decorative dots */}
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>

                        {/* Optional text */}
                        <p className="text-xs text-zinc-400 dark:text-zinc-600 tracking-wider uppercase">
                            Niklas Frick
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}