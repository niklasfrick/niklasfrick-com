'use client'

import { formatDate, getRelativeTime } from '@/lib/blog-utils'

interface BlogDateDisplayProps {
  date: string
  lastUpdated: string
  className?: string
}

export function BlogDateDisplay({
  date,
  lastUpdated,
  className = '',
}: BlogDateDisplayProps) {
  const isUpdated = date !== lastUpdated

  return (
    <div
      className={`flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      <span>Erstellt am {formatDate(date)}</span>
      {isUpdated && (
        <>
          <span>•</span>
          <span>Zuletzt aktualisiert {getRelativeTime(lastUpdated)}</span>
        </>
      )}
    </div>
  )
}
