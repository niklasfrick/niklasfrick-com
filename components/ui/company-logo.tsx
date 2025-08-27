'use client'

import { useState, useEffect } from 'react'
import { generateCompanyLogo } from '@/lib/utils'

interface CompanyLogoProps {
    companyName: string
    logoUrl?: string
    className?: string
    size?: number
}

export function CompanyLogo({
    companyName,
    logoUrl,
    className = "w-12 h-12 rounded-lg object-contain",
    size = 48
}: CompanyLogoProps) {
    const [currentLogo, setCurrentLogo] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)

        if (logoUrl) {
            // Check if it's a local logo from public folder
            if (logoUrl.startsWith('/')) {
                setCurrentLogo(logoUrl)
                setIsLoading(false)
                setHasError(false)
                return
            }

            // For external URLs, try to load them
            setCurrentLogo(logoUrl)
            setIsLoading(false)
            setHasError(false)
            return
        }

        // Use generated logo directly to avoid hydration issues
        setCurrentLogo(generateCompanyLogo(companyName))
        setIsLoading(false)
    }, [companyName, logoUrl])

    // Handle external logo loading with timeout
    useEffect(() => {
        if (!logoUrl || !isMounted) return

        const timeoutId = setTimeout(() => {
            // If external logo takes too long, fall back to generated
            if (isLoading) {
                setHasError(true)
                setCurrentLogo(generateCompanyLogo(companyName))
                setIsLoading(false)
            }
        }, 3000) // 3 second timeout

        return () => clearTimeout(timeoutId)
    }, [logoUrl, isLoading, isMounted, companyName])

    const handleError = () => {
        if (!hasError) {
            setHasError(true)
            setCurrentLogo(generateCompanyLogo(companyName))
        }
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted) {
        return (
            <div
                className={`flex-shrink-0 w-12 h-12 rounded-lg animate-pulse`}
                style={{ width: size, height: size }}
            />
        )
    }

    // Determine if this is a generated logo (no logoUrl provided)
    const isGeneratedLogo = !logoUrl

    return (
        <div className={`flex-shrink-0 ${className}`}>
            {isLoading && (
                <div
                    className="w-full h-full rounded-lg animate-pulse"
                    style={{ width: size, height: size }}
                />
            )}
            <img
                src={currentLogo}
                alt={`${companyName} logo`}
                className={`${className} ${isLoading ? 'hidden' : ''} ${isGeneratedLogo ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                style={{ width: size, height: size }}
                onError={handleError}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}
