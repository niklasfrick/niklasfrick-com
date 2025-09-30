import { formatDate, getRelativeTime } from '@/lib/blog-utils'

interface MetadataBlogDateDisplayProps {
  date: string
  lastUpdated?: string
  className?: string
}

export function MetadataBlogDateDisplay({
  date,
  lastUpdated,
  className = '',
}: MetadataBlogDateDisplayProps) {
  const isUpdated = date !== lastUpdated

  return (
    <div
      className={`flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      <span>Erstellt am {formatDate(date)}</span>
      {isUpdated && lastUpdated && (
        <>
          <span>•</span>
          <span>Zuletzt aktualisiert {getRelativeTime(lastUpdated)}</span>
        </>
      )}
    </div>
  )
}
