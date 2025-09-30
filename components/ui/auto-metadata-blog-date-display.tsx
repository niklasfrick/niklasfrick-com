import { formatDate, getRelativeTime } from '@/lib/blog-utils'

interface AutoMetadataBlogDateDisplayProps {
  title: string
  description: string
  date: string
  lastUpdated?: string
  className?: string
}

export function AutoMetadataBlogDateDisplay({
  title,
  description,
  date,
  lastUpdated,
  className = '',
}: AutoMetadataBlogDateDisplayProps) {
  const isUpdated = date !== lastUpdated

  return (
    <div className={className}>
      {/* Title */}
      <h1 className="mb-4 text-2xl font-medium">{title}</h1>

      {/* Description */}
      {description && (
        <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}

      {/* Date Display */}
      <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
        <span>Erstellt am {formatDate(date)}</span>
        {isUpdated && lastUpdated && (
          <>
            <span>•</span>
            <span>Zuletzt aktualisiert {getRelativeTime(lastUpdated)}</span>
          </>
        )}
      </div>
    </div>
  )
}
