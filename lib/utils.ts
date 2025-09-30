import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a company logo URL from the company name
 * Uses DiceBear API to create a simple logo with company initials
 */
export function generateCompanyLogo(companyName: string): string {
  // Clean the company name and get initials
  const cleanName = companyName.replace(/[^a-zA-Z0-9\s]/g, '').trim()
  const words = cleanName.split(' ').filter((word) => word.length > 0)

  let initials = ''
  if (words.length >= 2) {
    initials = words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  } else if (words.length === 1) {
    initials = words[0].slice(0, 2).toUpperCase()
  } else {
    initials = 'CO'
  }

  // Use lighter zinc gray background with white text for a more subtle appearance
  const backgroundColor = 'a1a1aa' // Zinc-400 - lighter and less prominent
  const textColor = 'ffffff' // White

  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=${backgroundColor}&textColor=${textColor}&size=64&fontSize=24&fontWeight=600`
}

/**
 * Attempts to get a real company logo from a logo API
 * Falls back to generated logo if not found
 */
export async function getCompanyLogo(companyName: string): Promise<string> {
  try {
    // Try to get logo from Clearbit Logo API (free tier)
    const cleanName = companyName.replace(/[^a-zA-Z0-9\s]/g, '').trim()
    const response = await fetch(
      `https://logo.clearbit.com/${cleanName.toLowerCase().replace(/\s+/g, '')}.com`,
    )

    if (response.ok) {
      return response.url
    }
  } catch {
    // Silently fail and fall back to generated logo
  }

  // Fall back to generated logo
  return generateCompanyLogo(companyName)
}
