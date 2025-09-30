/**
 * Client-safe utility functions for blog date formatting
 * These functions can be used in both server and client components
 */

/**
 * Get the current date in ISO format (YYYY-MM-DD)
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Get the current date and time in ISO format
 */
export function getCurrentDateTime(): string {
  return new Date().toISOString()
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a date string for display with time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return dateString === today
}

/**
 * Get a human-readable relative time (e.g., "2 days ago", "yesterday")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  // Reset time to start of day for both dates to compare only dates
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const diffTime = nowOnly.getTime() - dateOnly.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'heute'
  if (diffDays === 1) return 'gestern'
  if (diffDays > 1 && diffDays < 7) return `vor ${diffDays} Tagen`
  if (diffDays >= 7 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? 'letzte Woche' : `vor ${weeks} Wochen`
  }
  if (diffDays >= 30 && diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return months === 1 ? 'vor 1 Monat' : `vor ${months} Monaten`
  }
  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365)
    return years === 1 ? 'letztes Jahr' : `vor ${years} Jahren`
  }

  // For future dates (shouldn't happen in normal usage)
  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    if (absDays === 1) return 'Morgen'
    if (absDays < 7) return `in ${absDays} Tagen`
    return `in ${Math.floor(absDays / 7)} Wochen`
  }

  return 'Heute' // fallback
}
